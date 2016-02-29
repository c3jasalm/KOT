/**
 * Created by jasal on 28.2.2016.
 */

package com.kottesting.Tests;

import com.kottesting.DriverFactory;
import com.kottesting.PageObjects.*;
import org.testng.Assert;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;
import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

import java.util.Locale;

public class SelectorTestsWD {

    @Test
    private void SEL_001_BasicTaskEntry() throws Exception{
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

    @AfterTest
    private void cleanUp() throws Exception {
        HomePage hp = new HomePage();
        SelectorPage sp = new SelectorPage();

        hp.goTo();
        hp.loginWithCorrectCredentials();

        sp.tasks.deleteAllEntries();
    }
}
