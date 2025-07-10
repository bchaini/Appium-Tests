# Appium Norton VPN Test

This project contains automated tests for the Norton VPN application on Android using Appium. The tests are designed to verify the functionality of connecting to and disconnecting from the VPN.

## Project Structure

```
appium-norton-vpn-test
├── src
│   ├── tests
│   │   └── nortonVpn.test.js
│   └── helpers
│       └── appiumHelper.js
├── package.json
├── .gitignore
└── README.md
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd appium-norton-vpn-test
   ```

2. **Install dependencies:**
   Ensure you have Node.js installed, then run:
   ```
   npm install
   ```

3. **Set up Appium:**
   Make sure you have Appium installed and running. You can install it globally using npm:
   ```
   npm install -g appium
   ```

4. **Configure your Android device:**
   - Enable Developer Options and USB Debugging on your Android device.
   - Ensure the Norton VPN app is installed on the device.

## Device Configuration

Before running tests, you need to configure the device settings in `src/helpers/appiumHelper.js`. Here's how to find the required values:

### 1. Getting Device Name (Device ID)

Connect your Android device via USB and run:
```bash
adb devices
```

This will show output like:
```
List of devices attached
c01e311a    device
```

The device name (e.g., `c01e311a`) goes in the `'appium:deviceName'` capability.

### 2. Getting App Package Name

To find the package name of any installed app:

**Method 1: Using adb (Recommended)**
```bash
# List all installed packages and filter for your app
adb shell pm list packages | grep -i norton

# Or list all packages and search manually
adb shell pm list packages
```

**Method 2: Using dumpsys**
```bash
# Get currently running activities (open the app first)
adb shell dumpsys window | grep -i mCurrentFocus
```

**Method 3: Using aapt (if you have the APK)**
```bash
aapt dump badging app.apk | grep package
```

For Norton VPN, the package is : `com.symantec.securewifi`

### 3. Getting App Activity

To find the main (launcher) activity:

**Method 1: Using adb and pm**
```bash
# Get the main activity for a package
adb shell cmd package resolve-activity --brief com.symantec.securewifi | tail -n 1
```

**Method 2: Using dumpsys while app is running**
```bash
# Open the app first, then run:
adb shell dumpsys activity activities | grep -i norton
```

**Method 3: List all activities for the package**
```bash
adb shell pm dump com.symantec.securewifi | grep -i activity
```

For Norton VPN, the main activity is : `com.norton.n360.SplashActivity`

### 4. Updating the Configuration

Update the capabilities in `src/helpers/appiumHelper.js`:

```javascript
capabilities: {
    platformName: 'Android',
    'appium:deviceName': 'YOUR_DEVICE_ID',           // From adb devices
    'appium:appPackage': 'YOUR_APP_PACKAGE',         // e.g., com.symantec.securewifi
    'appium:appActivity': 'YOUR_APP_ACTIVITY',       // e.g., com.norton.n360.SplashActivity
    'appium:automationName': 'UiAutomator2',
    // ...other capabilities
}
```





