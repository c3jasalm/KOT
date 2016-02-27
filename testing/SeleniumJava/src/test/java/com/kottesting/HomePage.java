/**
 * Created by jasal on 10.2.2016.
 */
package com.kottesting;

import com.kottesting.DriverFactory;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.Iterator;
import java.util.Set;

public class HomePage {

    private WebDriver selenium;

    @FindBy(className = "btn-GitHub")
    private WebElement loginButton;

    @FindBy(id = "login_field")
    private WebElement usernameField;

    @FindBy(id = "password")
    private WebElement passwordField;

    @FindBy(name = "commit")
    private WebElement submitLogin;

    @FindBy(id = "login-dropdown-list")
    private WebElement loginDropdownMenu;

    @FindBy(id = "login-buttons-logout")
    private WebElement logoutLink;

    @FindBy(id = "userInfo")
    private WebElement userInfo;

    public NavigationTabs tabs = new NavigationTabs();

    public HomePage() throws Exception {
        this.selenium = DriverFactory.getDriver();
        PageFactory.initElements(selenium, this);
    }

    // Navigate to root address
    public void goTo() {
        //selenium.get("http://192.168.0.10:3000/");
        //selenium.get("http://cottest.meteor.com");
        selenium.get("http://localhost:3000");
    }

    // Login with default credentials
    public void loginWithCorrectCredentials() {
        String username = System.getenv("KOT_VALID_USERNAME");
        String password = System.getenv("KOT_VALID_PASSWORD");

        loginWithUsernameAndPassword(username, password);
    }

    // Login with provided credentials
    public void loginWithUsernameAndPassword(String username, String password) {
        // Click login button
        WebDriverWait wait = new WebDriverWait(selenium, 10);
        wait.until(ExpectedConditions.visibilityOf(loginButton));
        loginButton.click();

        // Switch to popup window
        String parentWindowHandler = selenium.getWindowHandle();
        String subWindowHandler = null;

        Set<String> handles = selenium.getWindowHandles();
        Iterator<String> iterator = handles.iterator();
        while (iterator.hasNext()){
            subWindowHandler = iterator.next();
        }
        selenium.switchTo().window(subWindowHandler);

        // Enter credentials
        usernameField.sendKeys(username);
        passwordField.sendKeys(password);

        // Submit
        submitLogin.click();

        // Switch back to main window
        selenium.switchTo().window(parentWindowHandler);

        // Wait for login to complete
        try {
            wait = new WebDriverWait(selenium, 10);
            wait.until(ExpectedConditions.visibilityOf(userInfo));
        } catch (org.openqa.selenium.TimeoutException e) {
            System.out.println("User info not found");
        }
    }

    public void logout() {
        // Open dropdown menu
        loginDropdownMenu.click();

        //Log out
        logoutLink.click();
    }

    public boolean userInfoContains(String string) {
        return userInfo.getText().contains(string);
    }

    public boolean canLogin() {
        WebDriverWait wait = new WebDriverWait(selenium, 10);
        wait.until(ExpectedConditions.visibilityOf(loginButton));

        return selenium.findElements(By.className("btn-GitHub")).size() == 1;
    }
}
