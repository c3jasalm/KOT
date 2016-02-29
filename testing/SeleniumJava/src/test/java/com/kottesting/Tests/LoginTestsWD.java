package com.kottesting.Tests;

import com.kottesting.DriverFactory;
import com.kottesting.PageObjects.HomePage;
import org.testng.Assert;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

public class LoginTestsWD extends DriverFactory {
/*
    @BeforeTest
    private void beforeTest() throws Exception {

    }

    // FUN_001: Login With Correct Credentials
    @Test
    private void FUN_001_LoginWithCorrectCredentials() throws Exception {

        String username = System.getenv("KOT_VALID_USERNAME");

        HomePage hp = new HomePage();
        hp.goTo();

        // Login
        hp.loginWithCorrectCredentials();

        // Verify login
        Assert.assertTrue(hp.userInfoContains(username), "FUN_001: Login failed with correct credentials");
    }

    @Test
    // FUN_002: Logout
    private void FUN_002_Logout() throws Exception {

        HomePage hp = new HomePage();
        hp.goTo();

        // Login
        hp.loginWithCorrectCredentials();

        // Logout
        hp.logout();

        // Verify logout
        Assert.assertTrue(hp.canLogin(), "FUN_002: Logout failed");
    }

    @Test
    // FUN_003: Login With Incorrect Password
    private void FUN_003_LoginWithIncorrectPassword() throws Exception {
        String username = System.getenv("KOT_VALID_USERNAME");

        HomePage hp = new HomePage();
        hp.goTo();

        // Login
        hp.loginWithUsernameAndPassword(username, "wrong");

        // Verify login failed
        Assert.assertTrue(hp.canLogin(), "FUN_003: Login succeeded with incorrect credentials");

    }
    */
}
