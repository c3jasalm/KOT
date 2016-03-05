package com.kottesting;

import com.kottesting.config.DriverType;
import org.openqa.selenium.Platform;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.Proxy;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.concurrent.TimeUnit;

import static com.kottesting.config.DriverType.FIREFOX;
import static com.kottesting.config.DriverType.valueOf;

import static com.kottesting.config.DriverType.FIREFOX;
import static com.kottesting.config.DriverType.valueOf;
import static org.openqa.selenium.Proxy.ProxyType.MANUAL;

public class WebDriverThread {

    private WebDriver webdriver;
    private DriverType selectedDriverType;

    private final DriverType defaultDriverType = FIREFOX;
    private final String browser = System.getProperty("browser").toUpperCase();
    private final String operatingSystem = System.getProperty("os.name").toUpperCase();
    private final String systemArchitecture = System.getProperty("os.arch");
    private final boolean useRemoteWebDriver = Boolean.getBoolean("remoteDriver");
    private final boolean proxyEnabled = Boolean.getBoolean("proxyEnabled");
    private final String proxyHostname = System.getProperty("proxyHost");
    private final Integer proxyPort = Integer.getInteger("proxyPort");
    private final String proxyDetails = String.format("%s:%d", proxyHostname, proxyPort);

    public WebDriver getDriver() throws Exception {

        if(webdriver == null) {
            getNewDriver();
        }
        else if (webdriver.toString().contains("null")) {
            getNewDriver();
        }

        return webdriver;
    }

    public void getNewDriver() throws Exception{
        Proxy proxy = null;
        if (proxyEnabled) {
            proxy = new Proxy();
            proxy.setProxyType(MANUAL);
            proxy.setHttpProxy(proxyDetails);
            proxy.setSslProxy(proxyDetails);
        }
        selectedDriverType = determineEffectiveDriverType();
        DesiredCapabilities desiredCapabilities = selectedDriverType.getDesiredCapabilities(proxy);
        instantiateWebDriver(desiredCapabilities);
    }

    public void quitDriver() {
        if (null != webdriver) {
            webdriver.quit();
        }
    }

    private DriverType determineEffectiveDriverType() {
        DriverType driverType = defaultDriverType;
        try {
            driverType = valueOf(browser);
        } catch (IllegalArgumentException ignored) {
            System.err.println("Unknown driver specified, defaulting to '" + driverType + "'...");
        } catch (NullPointerException ignored) {
            System.err.println("No driver specified, defaulting to '" + driverType + "'...");
        }
        return driverType;
    }

    private void instantiateWebDriver(DesiredCapabilities desiredCapabilities) throws MalformedURLException {
        System.out.println(" ");
        System.out.println("Current Operating System: " + operatingSystem);
        System.out.println("Current Architecture: " + systemArchitecture);
        System.out.println("Current Browser Selection: " + selectedDriverType);
        System.out.println("Remote: " + useRemoteWebDriver);
        System.out.println(" ");
        //webdriver = selectedDriverType.getWebDriverObject(desiredCapabilities);

        if (useRemoteWebDriver) {
            URL seleniumGridURL = new URL(System.getProperty("gridURL"));
            System.out.println("URL: " + seleniumGridURL);
            String desiredBrowserVersion = System.getProperty("desiredBrowserVersion");
            String desiredPlatform = System.getProperty("desiredPlatform");

            if (null != desiredPlatform && !desiredPlatform.isEmpty()) {
                desiredCapabilities.setPlatform(Platform.valueOf(desiredPlatform.toUpperCase()));
            }

            if (null != desiredBrowserVersion && !desiredBrowserVersion.isEmpty()) {
                desiredCapabilities.setVersion(desiredBrowserVersion);
            }
            System.out.println(desiredCapabilities);

            webdriver = new RemoteWebDriver(seleniumGridURL, desiredCapabilities);

        } else {
            webdriver = selectedDriverType.getWebDriverObject(desiredCapabilities);
        }
    }
}