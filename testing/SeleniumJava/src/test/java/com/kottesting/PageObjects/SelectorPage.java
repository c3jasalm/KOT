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
 * Created by jasal on 28.2.2016.
 */
public class SelectorPage {

    private WebDriver selenium;

    @FindBy(id = "dateTimeCalendar")
    private WebElement calendar;

    @FindBy(id = "setTime")
    private WebElement setTime;

    @FindBy(id = "comment")
    private WebElement commentField;

    @FindBy(id = "submitButton")
    private WebElement submitButton;

    @FindBy(xpath = "/html/body/div[4]/ul/li[1]/div/div[1]/table/tbody")
    private WebElement dateSelectTable;

    @FindBy(className = "picker-switch")
    private WebElement monthSelect;

    @FindBy(xpath = "/html/body/div[4]/ul/li[1]/div/div[2]/table/thead/tr/th[2]")
    private WebElement yearSelect;

    @FindBy(xpath = "/html/body/div[4]/ul/li[1]/div/div[2]/table/tbody")
    private WebElement monthSelectTable;

    @FindBy(xpath = "/html/body/div[4]/ul/li[1]/div/div[3]/table/tbody")
    private WebElement yearSelectTable;

    public NavigationTabs tabs = new NavigationTabs();
    public TaskEntryList tasks = new TaskEntryList();
    public UserInfo info = new UserInfo();

    public SelectorPage() throws Exception {
        this.selenium = DriverFactory.getDriver();
        PageFactory.initElements(selenium, this);
    }

    public void setDate(String year, String month, String date) throws Exception {
        selectYear(year);
        selectMonth(month);
        selectDate(date);
    }

    // Select Date
    private void selectDate(String date) {
        //calendar.click();
        clickTableItem(dateSelectTable, date);
    }

    // Select Month
    private void selectMonth(String month) {
        //calendar.click();
        //monthSelect.click();
        clickTableItem(monthSelectTable, month);
    }

    // Select Year
    private void selectYear(String year) throws Exception{
        calendar.click();

        // Months
        monthSelect.click();
        // Years
        yearSelect.click();

        clickTableItem(yearSelectTable, year);
    }

    // Select Duration
    public void selectDuration(String duration) {
        List<WebElement> allOptions = setTime.findElements(By.tagName("option"));
        for (WebElement option : allOptions) {
            if(option.getText().equals(duration)) {
                option.click();
                break;
            }
        }
    }

    // Set Description
    public void setDescription(String description) {
        commentField.sendKeys(description);
    }

    public void submit() {
        submitButton.click();
        commentField.clear();
    }

    private void clickTableItem(WebElement table, String targetString) {
        // Scan table and click on a item
        List<WebElement> allRows = table.findElements(By.tagName("tr"));
        for (WebElement row : allRows) {
            List<WebElement> cells = row.findElements(By.tagName("td"));
            for (WebElement cell : cells) {
                if(cell.getText().contains(targetString)) {
                    if(cell.getText().equals(targetString)) {
                        cell.click();
                        return;
                    } else {
                        List<WebElement> spans = cell.findElements(By.tagName("span"));
                        for (WebElement span : spans) {
                            if(span.getText().equals(targetString)) {
                                span.click();
                                return;
                            }
                        }
                    }
                }
            }
        }
    }
}
