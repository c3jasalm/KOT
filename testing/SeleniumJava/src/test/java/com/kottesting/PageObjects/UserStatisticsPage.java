package com.kottesting.PageObjects;

import com.kottesting.DriverFactory;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

/**
 * Created by jasal on 7.3.2016.
 */
public class UserStatisticsPage {

    WebDriver selenium;

    @FindBy(id = "userStatistics")
    WebElement userStatisticsText;

    @FindBy(className = "progress-bar")
    WebElement progressBar;

    public NavigationTabs tabs = new NavigationTabs();
    public TaskEntryList tasks = new TaskEntryList();
    public UserInfo info = new UserInfo();

    public UserStatisticsPage() throws Exception {
        this.selenium = DriverFactory.getDriver();
        PageFactory.initElements(selenium, this);
    }

    public int getTotalHours() {
        return Integer.parseInt(userStatisticsText.getText().split(" ")[0]);
    }

    public int getPercentage() {
        String tmpPercentage = userStatisticsText.getText().split("\\(")[1];
        tmpPercentage = tmpPercentage.substring(0, tmpPercentage.length() - 2);
        return Integer.parseInt(tmpPercentage);
    }

    public int getProgressBarPercentage() {
        return Integer.parseInt(progressBar.getAttribute("aria-valuenow"));
    }
}
