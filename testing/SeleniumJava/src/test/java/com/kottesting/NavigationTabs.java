/**
 * Created by jasal on 10.2.2016.
 */

package com.kottesting;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class NavigationTabs {

    WebDriver selenium;

    @FindBy(id = "ui-id-1")
    private WebElement selectorTab;

    @FindBy(id = "ui-id-2")
    private WebElement counterTab;

    @FindBy(id = "ui-id-3")
    private WebElement statisticsTab;

    @FindBy(id = "ui-id-4")
    private WebElement toplistTab;

    @FindBy(id = "ui-id-5")
    private WebElement infoTab;

    public NavigationTabs() throws Exception {
        this.selenium = DriverFactory.getDriver();
        PageFactory.initElements(selenium, this);
    }

    public void goToTab(Tab tab) {
        if (tab == Tab.SELECTOR) {
            selectorTab.click();
        } else if (tab == Tab.COUNTER) {
            counterTab.click();
        } else if (tab == Tab.STATISTICS) {
            statisticsTab.click();
        } else if (tab == Tab.TOPLIST) {
            toplistTab.click();
        } else if (tab == Tab.INFO) {
            infoTab.click();
        }
    }

    public enum Tab {
        SELECTOR, COUNTER, STATISTICS, TOPLIST, INFO
    }
}
