package com.kottesting.PageObjects;

import com.kottesting.DriverFactory;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

/**
 * Created by jasal on 1.3.2016.
 */
public class CounterPage {

    WebDriver selenium;

    @FindBy(id = "submitButton")
    private WebElement submitButton;

    @FindBy(name = "comment")
    private WebElement commentField;

    @FindBy(id = "startStop")
    private WebElement startStopButton;

    @FindBy(id = "stats")
    private WebElement statisticsInfo;

    public NavigationTabs tabs = new NavigationTabs();
    public TaskEntryList tasks = new TaskEntryList();
    public UserInfo info = new UserInfo();

    public CounterPage() throws Exception {
        this.selenium = DriverFactory.getDriver();
        PageFactory.initElements(selenium, this);
    }

    public void startStopCounter() {
        startStopButton.click();
    }

    public void recordTaskForDuration(int hours, int minutes) {
        startStopCounter();

        waitUntil(hours, minutes);

        startStopCounter();

        selenium.switchTo().alert().accept();
    }

    public void waitUntil(int hours, int minutes) {
        int totalSeconds = (hours * 3600) + (minutes * 60) + 120;

        WebDriverWait wait = new WebDriverWait(selenium, totalSeconds, 300);
        wait.until(ExpectedConditions.textToBePresentInElement(statisticsInfo, hours + "h " + minutes + "min 0sec"));
    }

    public void setDescription(String comment) {
        commentField.sendKeys(comment);
    }

    public void submit() {
        submitButton.click();
    }

    public boolean submitEnabled() {
        if(submitButton.getAttribute("enabled") == null) {
            return false;
        }

        return true;
    }
}
