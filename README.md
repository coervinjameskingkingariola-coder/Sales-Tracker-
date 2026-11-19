# Sales Tracker (Sari-Sari) – Android app

The whole app is one file: `www/index.html`. GitHub builds the Android APK for you.

## First time
1. Create a new **empty** repository on github.com (e.g. `sales-tracker-android`).
2. Upload everything in this folder (drag & drop works: *Add file → Upload files*), including the
   hidden `.github` folder. Or from a terminal:
   ```
   git init && git add . && git commit -m "first version"
   git branch -M main
   git remote add origin https://github.com/YOUR-NAME/sales-tracker-android.git
   git push -u origin main
   ```
3. Open the **Actions** tab → *Build Android APK*. It runs by itself after every push (about 5–8 minutes).
4. Download the APK from the **Releases** page on the right side of the repo (or from the run's *Artifacts*).
5. Send `app-debug.apk` to your phone, open it, and allow "Install unknown apps" when asked.

## Updating the app
Replace `www/index.html` with the new version and commit. GitHub rebuilds a new APK. Download it and open it on the phone: it installs **over** the old app and keeps your data.
Keep `debug.keystore` in the repo and never delete it: every build must use the same key, or the phone will refuse the update.

## Changing the logo
Replace the PNGs in `assets/` (`icon-only`, `icon-foreground`, `icon-background`, `splash`) and commit.
`assets/logo.svg` is the original logo.

## Notes
- Package name is in `capacitor.config.json` (`com.salestracker.app`). Change it before your first install if you want another one.
- This builds a *debug* APK, which is fine for installing on your own phone. Google Play needs a signed release build.
- Data stays on the phone (browser storage of the app), plus whatever your Google Sheet sync does. Uninstalling the app erases the local data.
