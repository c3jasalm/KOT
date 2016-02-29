package com.kottesting.PageObjects;

import com.kottesting.DriverFactory;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

/**
 * Created by jasal on 29.2.2016.
 */
public class UserInfo {

    WebDriver selenium;

    @FindBy(id = "userInfo")
    private WebElement userInfo;

    public UserInfo() throws Exception {
        this.selenium = DriverFactory.getDriver();
        PageFactory.initElements(selenium, this);
    }

    public boolean userInfoContains(String string) {
        return userInfo.getText().contains(string);
    }

    public String getTotalTime() {
        String[] parts = userInfo.getText().split(" ");
        return parts[parts.length - 1];
    }

}
