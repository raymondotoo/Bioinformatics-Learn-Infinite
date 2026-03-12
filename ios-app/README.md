# Bioinformatics Learn Infinite - iOS App

A native iOS app wrapper for the Bioinformatics Learn Infinite website.

## Features

- Full website access in native app
- Pull-to-refresh
- Back/forward swipe navigation
- External links open in Safari
- Works offline (cached pages)

## Setup Instructions

### Option 1: Using XcodeGen (Recommended)

1. **Install XcodeGen**
   ```bash
   brew install xcodegen
   ```

2. **Generate Xcode project**
   ```bash
   cd ios-app/BioinfoLearn
   xcodegen generate
   ```

3. **Open in Xcode**
   ```bash
   open BioinfoLearn.xcodeproj
   ```

4. **Configure signing**
   - Select BioinfoLearn target
   - Go to "Signing & Capabilities"
   - Select your Team
   - Update Bundle Identifier if needed

5. **Run on simulator or device**
   - Select a simulator or connected device
   - Press ⌘R or click Play button

### Option 2: Manual Xcode Setup

1. **Create new Xcode project**
   - Open Xcode
   - File → New → Project
   - Choose "App"
   - Product Name: `BioinfoLearn`
   - Interface: SwiftUI
   - Language: Swift

2. **Replace generated files**
   - Delete the generated `ContentView.swift`
   - Copy `BioinfoLearn/ContentView.swift` to your project
   - Replace `BioinfoLearnApp.swift` with the one from this folder

3. **Configure and run**
   - Set deployment target to iOS 15.0+
   - Select simulator or device
   - Run

## App Store Submission

### Requirements

- Apple Developer Program membership ($99/year)
- App icons in all required sizes
- Screenshots for App Store listing
- Privacy policy URL

### Steps

1. **Add App Icon**
   - Create 1024x1024 PNG image
   - Add to `Assets.xcassets/AppIcon.appiconset`

2. **Archive and Upload**
   - In Xcode: Product → Archive
   - Click "Distribute App"
   - Select "App Store Connect"
   - Follow prompts

3. **App Store Connect**
   - Go to appstoreconnect.apple.com
   - Create new app
   - Fill in app details
   - Submit for review

## Customization

### Change App Name
Edit `project.yml`:
```yaml
CFBundleDisplayName: Your App Name
```

### Change App Icon
Replace `AppIcon.appiconset` contents with your icon files.

### Add Splash Screen
Add launch screen configuration in `project.yml` under `UILaunchScreen`.

## TestFlight Distribution

For beta testing before App Store release:

1. Archive the app in Xcode
2. Upload to App Store Connect
3. Go to TestFlight tab
4. Add testers by email
5. Testers install via TestFlight app

---

**Website:** https://www.bioinfolearninfinite.com
