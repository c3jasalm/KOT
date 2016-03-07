package com.kottesting.PageObjects;

import com.kottesting.DriverFactory;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.Select;

import java.util.List;

/**
 * Created by jasal on 7.3.2016.
 */
public class TopListPage {

    WebDriver selenium;

    @FindBy(name = "name")
    WebElement userName;

    @FindBy(name = "team")
    WebElement teamName;

    @FindBy(name = "hours")
    WebElement totalHours;

    @FindBy(className = "user")
    WebElement userTitle;

    @FindBy(className = "team")
    WebElement teamTitle;

    @FindBy(className = "hours")
    WebElement hoursTitle;

    public NavigationTabs tabs = new NavigationTabs();
    public TaskEntryList tasks = new TaskEntryList();
    public UserInfo info = new UserInfo();

    public TopListPage() throws Exception {
        this.selenium = DriverFactory.getDriver();
        PageFactory.initElements(selenium, this);
    }

    public String getUserName() {
        return userName.getText();
    }

    public String getTeamName() {
        return teamName.getText();
    }
}
