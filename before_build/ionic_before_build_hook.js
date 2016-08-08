#!/usr/bin/env node

/*
 * Hook to update AndroidManifest.xml as part of pre-build process of your Ionic/Cordova application. 
 * 
 * In AndroidManifest.xml we have an <activity> config which has android:windowSoftInputMode="adjustResize" as the default config.
 * The adjustPan makes your application run in a panned mode which shows the statusbar/drawer and the on-screen navigation buttons.
 *
 *
 *
 *
 * Since the manifest is generated when we do "cordova build android" or "ionic build android", we directly do not have a control on it.
 *
 * Hence we need a hook that executes itself when the build is in progress and in this case it's a "before_build" hook.
 *
 * To know more about hooks visit, http://netmedia.io/mobile-development/cordova-hooks-properly-set-mobile-app-project-using-ionic-framework_5433
 *
 * NOTE (FOR FIRST TIME NODE USERS) - THE FIRST LINE OF THIS FILE IS OF UTMOST IMPORTANCE, IF YOU DELETE IT THE HOOK WILL NOT COMPILE AND HENCE WILL NOT WORK.
 *									  OR TO KNOW ABOUT IT READ THIS - http://stackoverflow.com/questions/15061001/what-does-bin-env-mean-at-the-top-of-a-node-js-script
 * 
 * One is free to use the below hook as part of their code, modify it or redistribute it as they like.
 *
 */

var fs = require('fs');
var path = require('path');

// Location to manifest /platforms/android/AndroidManifest.xml
var manifestFilePath = path.join(__dirname, '../../platforms/android', 'AndroidManifest.xml');

fs.stat(manifestFilePath, function(error, stat) {
  if (error) {
    if ('ENONT' == error.code) {
      console.log('Error: File not found - AndroidManifest.xml');
    }
    else {
      console.log('Error: Internal server error');
    }
  }
  else {
    try {
        var manifest = fs.readFileSync(manifestFilePath, 'utf8');

        var buffer = manifest.replace(/(android:windowSoftInputMode=").*?(")/, '$1adjustPan$2');

        fs.writeFileSync(manifestFilePath, buffer, 'utf8');

        console.log('Config android:windowSoftInputMode="adjustResize" upated to "adjustPan" in AndroidManifest.xml');
    }
    catch(e) {
      process.stdout.write(e);
    }
  }
});