/**
 * Created by jasal on 28.2.2016.
 */

package com.kottesting.Tests;

import com.kottesting.DriverFactory;
import com.kottesting.PageObjects.*;
import com.kottesting.util.Util;
import org.testng.Assert;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;
import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

public class SelectorTestsWD extends DriverFactory {

    @BeforeClass
    private void initialClean() throws Exception {
        HomePage hp = new HomePage();
        SelectorPage sp = new SelectorPage();

        hp.goTo();
        hp.loginWithCorrectCredentials();

        sp.tasks.deleteAllEntries();

        getDriver().quit();
    }


    @Test
    private void SEL_001_BasicTaskEntry() throws Exception{
        System.out.println("SEL_001");
        String month = "Jan";
        String date = "15";
        String year = "2015";
        String duration = "01:30";
        String description = "SEL_001 testing";

        DateTimeFormatter format = DateTimeFormat.forPattern("MMM");
        DateTime instance = format.withLocale(Locale.ENGLISH).parseDateTime(month);
        int monthNumber = instance.getMonthOfYear();
        String monthNumberString = String.format("%02d", monthNumber);

        HomePage hp = new HomePage();
        SelectorPage sp = new SelectorPage();

        hp.goTo();
        hp.loginWithCorrectCredentials();

        hp.tabs.goToTab(NavigationTabs.Tab.SELECTOR);

        // Enter task
        sp.setDate(year, month, date);
        sp.selectDuration(duration);
        sp.setDescription(description);
        sp.submit();

        // Round current time to nearest 15 minutes
        Util util = new Util();
        DateTime dt = new DateTime();
        dt = util.roundToNearestQuarter(dt);

        TaskEntry entry = sp.tasks.getTopEntry();

        Assert.assertEquals(entry.date, date + "." + monthNumberString + "." + year, "SEL_001: Wrong date");
        Assert.assertEquals(entry.time, String.format("%02d", dt.getHourOfDay()) + ":" + String.format("%02d", dt.getMinuteOfHour()));
        Assert.assertEquals(entry.duration, duration, "SEL_001: Incorrect duration");
        Assert.assertEquals(entry.comment, description, "SEL_001: Incorrect comment");
        Assert.assertEquals(entry.mode, "basic", "SEL_001: Incorrect mode");

        // Delete entry
        sp.tasks.deleteTopEntry();

        Assert.assertEquals(sp.tasks.getListSize(), 0, "SEL_001: Task not deleted");

    }

    @Test
    private void SEL_002_EnteringMultipleTask() throws Exception{
        System.out.println("SEL_002");

        // Create list of tasks
        List<TaskEntry> tasks = new ArrayList<TaskEntry>();
        tasks.add(new TaskEntry("10-01-15", "01:30", "SEL_002 Task1"));
        tasks.add(new TaskEntry("12-01-15", "02:30", "SEL_002 Task2"));
        tasks.add(new TaskEntry("20-01-15", "00:15", "SEL_002 Task3"));

        // Calculate expected total hours
        int totalHours = 0;
        int totalMinutes = 0;
        for(TaskEntry task : tasks) {
            String[] parts = task.duration.split(":");
            totalHours += Integer.parseInt(parts[0]);
            totalMinutes += Integer.parseInt(parts[1]);
        }
        while(totalMinutes >= 60) {
            totalHours++;
            totalMinutes -= 60;
        }

        HomePage hp = new HomePage();
        SelectorPage sp = new SelectorPage();

        hp.goTo();
        hp.loginWithCorrectCredentials();

        hp.tabs.goToTab(NavigationTabs.Tab.SELECTOR);

        // Submit tasks
        for(TaskEntry task : tasks) {
            System.out.println(task.year + " " + task.month + " " + task.date);
            sp.setDate(task.year, task.month, task.date);
            sp.selectDuration(task.duration);
            sp.setDescription(task.comment);
            sp.submit();
        }

        Assert.assertEquals(sp.tasks.getListSize(), tasks.size(), "SEL_002: Incorrect number of tasks");
        Assert.assertEquals(sp.info.getTotalTime(), String.format("%02d", totalHours) + ":" +
                String.format("%02d", totalMinutes), "SEL_002: Incorrect total time");

        sp.tasks.deleteAllEntries();

        Assert.assertEquals(sp.tasks.getListSize(), 0, "SEL_002: Tasks not deleted");

        Assert.assertEquals(sp.info.getTotalTime(), "00:00", "SEL_002: Total hours is incorrect");

    }

    @Test
    private void SEL_003_DescriptionIsMandatory() throws Exception {
        System.out.println("SEL_003");

        String duration = "01:00";

        HomePage hp = new HomePage();
        SelectorPage sp = new SelectorPage();

        hp.goTo();
        hp.loginWithCorrectCredentials();

        sp.selectDuration(duration);
        sp.submit();

        Assert.assertEquals(sp.tasks.getListSize(), 0, "SEL_003: Task List not empty");
        Assert.assertEquals(sp.info.getTotalTime(), "00:00", "SEL_003: Total hours is incorrect");
    }


    @AfterTest
    private void cleanUp() throws Exception {
        HomePage hp = new HomePage();
        SelectorPage sp = new SelectorPage();

        hp.goTo();
        hp.loginWithCorrectCredentials();

        sp.tasks.deleteAllEntries();

        getDriver().quit();
    }

}
