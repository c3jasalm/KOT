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
public class TopListTestsWD extends DriverFactory {

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
    private void TOP_001_TopListShowsUserNameAndTeam() throws Exception{
        String team = "AAA";
        String username = System.getenv("KOT_VALID_USERNAME");

        HomePage hp = new HomePage();
        TopListPage tp = new TopListPage();
        UserStatisticsPage up = new UserStatisticsPage();
        SelectorPage sp = new SelectorPage();

        hp.goTo();
        hp.loginWithCorrectCredentials();

        hp.tabs.goToTab(NavigationTabs.Tab.SELECTOR);
        sp.setDescription("TOP_001");
        sp.submit();

        hp.tabs.goToTab(NavigationTabs.Tab.STATISTICS);
        up.setTeamName(team);

        hp.tabs.goToTab(NavigationTabs.Tab.TOPLIST);

        Assert.assertTrue(tp.getUserName().contains(username), "TOP_001: Wrong or missing username");
        Assert.assertTrue(tp.getTeamName().equals(team), "TOP_001: Wrong or missing team name");
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
