/**
 * Created by jasal on 28.2.2016.
 */

package com.kottesting.Tests;

import com.kottesting.DriverFactory;
import com.kottesting.PageObjects.*;
import org.testng.Assert;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

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
        TaskEntryList te = new TaskEntryList();

        hp.goTo();
        hp.loginWithCorrectCredentials();

        hp.tabs.goToTab(NavigationTabs.Tab.SELECTOR);

        sp.setDate(year, month, date);
        sp.selectDuration(duration);
        sp.setDescription(description);
        sp.submit();

        TaskEntry entry = te.getTopEntry();

        Assert.assertEquals(entry.duration, duration, "SEL_001: Incorrect duration");
        Assert.assertEquals(entry.comment, description, "SEL_001: Incorrect comment");
        Assert.assertEquals(entry.mode, "basic", "SEL_001: Incorrect mode");
    }
}
