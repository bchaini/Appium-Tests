const { remote } = require('webdriverio');
const { expect } = require('chai');

let driver;

async function initializeDriver() {
    driver = await remote({
        logLevel: 'info',
        path: '/',
        port: 4723,
        capabilities: {
            platformName: 'Android',
            'appium:deviceName': 'c01e311a', 
            'appium:appPackage': 'com.symantec.securewifi',
            'appium:appActivity': 'com.norton.n360.SplashActivity',
            'appium:automationName': 'UiAutomator2',
            'appium:noReset': true,
            'appium:ignoreHiddenApiPolicyError': true,
            'appium:skipServerInstallation': true,
            'appium:skipDeviceInitialization': true
        },
    });
    return driver;
}

async function startSession() {
    await initializeDriver();
}

async function connectVPN() {
    const connectButton = await driver.$('android=new UiSelector().className("android.widget.Button").textContains("Connect")');
    await connectButton.click();
}

async function checkConnection() {
    try {
        const connectedStatus = await driver.$('android=new UiSelector().resourceId("*:id/status*")');
        
        if (await connectedStatus.isDisplayed()) {
            const statusText = await connectedStatus.getText();
            const isConnected = statusText.toLowerCase().includes('connected');
            
            console.log('VPN connection status:', isConnected);
            return isConnected;
        }
        return false;
    } catch (error) {
        console.log('Error checking connection status:', error.message);
        return false;
    }
}

async function disconnectVPN() {
    const disconnectButton = await driver.$('android=new UiSelector().className("android.widget.Button").textContains("Disconnect")');
    await disconnectButton.click();
}

async function closeDriver() {
    await driver.deleteSession();
}

async function checkForPauseButton() {
    try {
        const pauseButton = await driver.$('android=new UiSelector().className("android.widget.Button").textContains("Pause")');
        return await pauseButton.isDisplayed();
    } catch (error) {
        return false;
    }
}

async function checkForDisconnectButton() {
    try {
        const disconnectButton = await driver.$('android=new UiSelector().className("android.widget.Button").textContains("Disconnect")');
        return await disconnectButton.isDisplayed();
    } catch (error) {
        return false;
    }
}

async function waitForElement(locators, timeout = 10000) {
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeout) {
        for (const locator of locators) {
            try {
                const element = await driver.$(locator);
                if (await element.isDisplayed()) {
                    return element;
                }
            } catch (error) {
                // Continue to next locator
            }
        }
        await driver.pause(500); // Wait 500ms before trying again
    }
    throw new Error(`Element not found with any of the provided locators within ${timeout}ms`);
}

module.exports = {
    initializeDriver,
    startSession,
    connectVPN,
    checkConnection,
    checkForPauseButton,
    checkForDisconnectButton,
    disconnectVPN,
    closeDriver,
    waitForElement,
};