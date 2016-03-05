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
/*
    @Test
    private void CNT_001_TooShortDuration() throws Exception{
        System.out.println("CNT_001");

        HomePage hp = new HomePage();
        CounterPage cp = new CounterPage();

        hp.goTo();
        hp.loginWithCorrectCredentials();
        hp.tabs.goToTab(NavigationTabs.Tab.COUNTER);

        cp.recordTaskForDuration(0, 2);

        Assert.assertFalse(cp.submitEnabled(), "CNT_001: Submit is enabled");
    }
*/
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

}
