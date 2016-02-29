/**
 * Created by jasal on 28.2.2016.
 */

package com.kottesting.Tests;

import com.kottesting.DriverFactory;
import com.kottesting.PageObjects.*;
import org.testng.Assert;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;
import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

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

        sp.setDate(year, month, date);
        sp.selectDuration(duration);
        sp.setDescription(description);
        sp.submit();

        // Round time to nearest 15 minutes
        DateTime dt = new DateTime();
        int mod = dt.getMinuteOfHour() % 15;
        dt = dt.plusMinutes(mod < 8 ? -mod : (15-mod));

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
        String month = "Jan";
        String[] dates = { "10", "12", "20" };
        String year = "2015";
        String[] durations = { "01:30", "02:30", "00:15" };
        String[] comments = { "SEL_002 Task1", "SEL_002 Task2", "SEL_002 Task3" };
        int totalHours = 0;
        int totalMinutes = 0;

        for(String duration : durations) {
            String[] parts = duration.split(":");
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

        for(int i = 0; i < dates.length; i++) {
            sp.setDate(year, month, dates[i]);
            sp.selectDuration(durations[i]);
            sp.setDescription(comments[i]);
            sp.submit();
        }

        Assert.assertEquals(sp.tasks.getListSize(), dates.length, "SEL_002: Incorrect number of tasks");
        Assert.assertEquals(sp.info.getTotalTime(), String.format("%02d", totalHours) + ":" +
                String.format("%02d", totalMinutes), "SEL_002: Incorrect total time");

        sp.tasks.deleteAllEntries();

        Assert.assertEquals(sp.tasks.getListSize(), 0, "SEL_002: Tasks not deleted");

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
