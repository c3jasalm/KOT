package com.kottesting.Tests;

import com.kottesting.DriverFactory;

import com.kottesting.DriverFactory;
import com.kottesting.PageObjects.*;
import com.kottesting.util.Util;
import org.testng.Assert;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by jasal on 7.3.2016.
 */
public class UserInfoTestsWD extends DriverFactory {

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
    private void USR_001_UserStatistics() throws Exception {
        System.out.println("USR_001");

        // Create list of tasks
        List<TaskEntry> tasks = new ArrayList<TaskEntry>();
        tasks.add(new TaskEntry("10-01-15", "03:00", "USR_001 Task1"));
        tasks.add(new TaskEntry("12-01-15", "03:00", "USR_001 Task2"));
        tasks.add(new TaskEntry("20-01-15", "03:00", "USR_001 Task3"));
        tasks.add(new TaskEntry("22-01-15", "03:00", "USR_001 Task4"));
        tasks.add(new TaskEntry("24-01-15", "03:00", "USR_001 Task5"));
        tasks.add(new TaskEntry("25-01-15", "03:00", "USR_001 Task6"));

        HomePage hp = new HomePage();
        SelectorPage sp = new SelectorPage();
        UserStatisticsPage up = new UserStatisticsPage();

        hp.goTo();
        hp.loginWithCorrectCredentials();

        hp.tabs.goToTab(NavigationTabs.Tab.SELECTOR);

        sp.submitTasks(tasks);

        hp.tabs.goToTab(NavigationTabs.Tab.STATISTICS);

        Assert.assertEquals(up.getTotalHours(), 18, "USR_001: Incorrect total hours");
        Assert.assertEquals(up.getPercentage(), 21, "USR_001: Incorrect percentage");
        Assert.assertEquals(up.getProgressBarPercentage(), 21, "USR_001: Incorrect progressbar percentage");

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
