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
import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;


/**
 * Created by jasal on 1.3.2016.
 */
public class CounterTestsWD extends DriverFactory {

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
    private void CNT_001_TooShortDuration() throws Exception{
        System.out.println("CNT_001");

        HomePage hp = new HomePage();
        CounterPage cp = new CounterPage();

        hp.goTo();
        hp.loginWithCorrectCredentials();
        hp.tabs.goToTab(NavigationTabs.Tab.COUNTER);

        cp.recordTaskForDuration(0, 2, "");

        Assert.assertFalse(cp.submitEnabled(), "CNT_001: Submit is enabled");
    }

    @Test
    private void CNT_002_TooShortDurationContinue() throws Exception {
        System.out.println("CNT_002");

        HomePage hp = new HomePage();
        CounterPage cp = new CounterPage();

        hp.goTo();
        hp.loginWithCorrectCredentials();
        hp.tabs.goToTab(NavigationTabs.Tab.COUNTER);

        cp.startStopCounter();
        cp.waitUntil(0, 1);
        cp.startStopCounter();
        getDriver().switchTo().alert().dismiss();
        cp.waitUntil(0, 2);
        cp.startStopCounter();
        getDriver().switchTo().alert().accept();

        Assert.assertFalse(cp.submitEnabled(), "CNT_001: Submit is enabled");
    }

    @Test
    private void CNT_003_ValidTaskLengths() throws Exception {
        System.out.println("CNT_003");

        int task1Minutes = 15;
        int task2Minutes = 22;
        int task3Minutes = 33;
        int totalMinutes = 15;
        int totalHours = 1;

        HomePage hp = new HomePage();
        CounterPage cp = new CounterPage();

        hp.goTo();
        hp.loginWithCorrectCredentials();
        hp.tabs.goToTab(NavigationTabs.Tab.COUNTER);

        cp.recordTaskForDuration(0, task1Minutes, "CNT_003 Task1");
        Assert.assertEquals(cp.tasks.getListSize(), 1, "CNT_003: Task 1 not added");

        cp.recordTaskForDuration(0, task2Minutes, "CNT_003 Task2");
        Assert.assertEquals(cp.tasks.getListSize(), 2, "CNT_003: Task 2 not added");

        cp.recordTaskForDuration(0, task3Minutes, "CNT_003 Task3");
        Assert.assertEquals(cp.tasks.getListSize(), 3, "CNT_003: Task 3 not added");

        Assert.assertEquals(cp.info.getTotalTime(), String.format("%02d", totalHours) + ":" +
                String.format("%02d", totalMinutes), "CNT_003: Wrong total time");
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
