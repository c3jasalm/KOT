package com.kottesting.PageObjects;

import com.kottesting.DriverFactory;
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import java.util.List;

/**
 * Created by jasal on 29.2.2016.
 */
public class TaskEntryList {

    WebDriver selenium;

    @FindBy(name = "taskRow")
    List<WebElement> taskRows;

    @FindBy(id = "showDelete")
    private WebElement showDelete;

    public TaskEntryList() throws Exception {
        this.selenium = DriverFactory.getDriver();
        PageFactory.initElements(selenium, this);
    }

    public TaskEntry getTopEntry() {

        WebElement taskRow = taskRows.get(0);

        TaskEntry entry = new TaskEntry();

        entry.date = taskRow.findElement(By.name("date")).getText();
        entry.time = taskRow.findElement(By.name("time")).getText();
        entry.duration = taskRow.findElement(By.name("duration")).getText();
        entry.comment = taskRow.findElement(By.name("comment")).getText();

        if(taskRow.findElement(By.name("mode")).getAttribute("class").contains("glyphicon-calendar")) {
            entry.mode = "basic";
        } else {
            entry.mode = "counter";
        }

        return entry;
    }

    public void deleteTopEntry() {
        enableDeletion();
        taskRows.get(0).findElement(By.name("deleteButton")).click();
        selenium.switchTo().alert().accept();
    }

    private void enableDeletion() {
        if(!showDelete.isSelected()) {
            showDelete.click();
        }
    }

    public int getListSize() {
        return taskRows.size();
    }
}
