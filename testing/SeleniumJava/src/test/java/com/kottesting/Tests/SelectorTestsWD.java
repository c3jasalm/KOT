/**
 * Created by jasal on 28.2.2016.
 */

package com.kottesting.Tests;

import com.gargoylesoftware.htmlunit.javascript.host.intl.DateTimeFormat;
import com.kottesting.DriverFactory;
import com.kottesting.PageObjects.*;
import org.testng.Assert;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;

public class SelectorTestsWD {

    @Test
    private void SEL_001_BasicTaskEntry() throws Exception{
        String month = "Jan";
        String date = "15";
        String year = "2015";
        String duration = "01:30";
        String description = "SEL_001 testing";

        HomePage hp = new HomePage();
        SelectorPage sp = new SelectorPage();

        hp.goTo();
        hp.loginWithCorrectCredentials();

        hp.tabs.goToTab(NavigationTabs.Tab.SELECTOR);

        sp.setDate(year, month, date);
        sp.selectDuration(duration);
        sp.setDescription(description);
        sp.submit();

        TaskEntry entry = sp.tasks.getTopEntry();

        // TODO: Assert date
        // TODO: Assert time
        Assert.assertEquals(entry.duration, duration, "SEL_001: Incorrect duration");
        Assert.assertEquals(entry.comment, description, "SEL_001: Incorrect comment");
        Assert.assertEquals(entry.mode, "basic", "SEL_001: Incorrect mode");

        // Delete entry
        sp.tasks.deleteTopEntry();

        Assert.assertEquals(sp.tasks.getListSize(), 0, "SEL_001: Task not deleted");

    }
}
