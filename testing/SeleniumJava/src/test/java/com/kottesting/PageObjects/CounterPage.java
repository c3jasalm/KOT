package com.kottesting.PageObjects;

import com.kottesting.DriverFactory;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.List;

/**
 * Created by jasal on 1.3.2016.
 */
public class CounterPage {

    WebDriver selenium;

    @FindBy(id = "submitButton")
    private WebElement submitButton;

    @FindBy(id = "counterComment")
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

    public void recordTaskForDuration(int hours, int minutes, String comment) {
        startStopCounter();

        waitUntil(hours, minutes);

        startStopCounter();

        if(hours == 0 && minutes < 15) {
            selenium.switchTo().alert().accept();
        }

        WebDriverWait wait = new WebDriverWait(selenium, 5, 500);
        wait.until(ExpectedConditions.visibilityOf(commentField));
        commentField.sendKeys(comment);

        submitButton.click();

        commentField.clear();
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
        //TODO: Read from attributes
        return false;
    }
}
