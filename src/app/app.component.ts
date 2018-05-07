import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { NativeStorage } from '@ionic-native/native-storage';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { OneSignal } from '@ionic-native/onesignal';
import { GlobalServiceProvider } from '../providers/global-service/global-service';
import * as Constants from '../providers/constants/constants';

import { SignInUpPage } from '../pages/sign-in-up/sign-in-up';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SignInUpPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              public alertCtrl: AlertController, private oneSignal: OneSignal, public nativeStorage: NativeStorage,
              public globalServiceProvider: GlobalServiceProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.initPushNotification();

      this.nativeStorage.getItem('hti').then( data => {
        setTimeout(() => {
          console.log('get local storage data : ', data);
        }, 10000);
        this.globalServiceProvider.userData = data.userData;
        this.nav.setRoot(HomePage);
      }, error => {
        setTimeout(() => {
          console.error('get local storage data err :', error);
        }, 10000);
      });
    });
  }

  initPushNotification() {
    if (!this.platform.is('cordova')) {
      console.warn("Push notifications not initialized. Cordova is not available - Run in physical device");
      return;
    }

    this.oneSignal.startInit(Constants.APP_ID, Constants.GOOGLE_PROJECT_NUMBER);

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe(() => {
    // do something when notification is received
    });

    this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened
    });

    this.oneSignal.endInit();



    // const options: PushOptions = {
    //   android: {
    //     senderID: "708876205103"
    //   },
    //   ios: {
    //     alert: "true",
    //     badge: false,
    //     sound: "true"
    //   },
    //   windows: {}
    // };
    // const pushObject: PushObject = this.push.init(options);

    // pushObject.on('registration').subscribe((data: any) => {
    //   console.log("device token -> " + data.registrationId);
    //   //TODO - send device token to server
    //   this.globalServiceProvider.deviceToken = data.registrationId;
    // });

    // pushObject.on('notification').subscribe((data: any) => {
    //   console.log('message', data.message);
    //   //if user using app and push notification comes
    //   if (data.additionalData.foreground) {
    //     // if application open, show popup
    //     let confirmAlert = this.alertCtrl.create({
    //       title: 'New Notification',
    //       message: data.message,
    //       buttons: [{
    //         text: 'Ignore',
    //         role: 'cancel'
    //       }, {
    //         text: 'View',
    //         handler: () => {
    //           //TODO: Your logic here

    //         }
    //       }]
    //     });
    //     confirmAlert.present();
    //   } else {
    //     //if user NOT using app and push notification comes
    //     //TODO: Your logic on click of push notification directly

    //     console.log("Push notification clicked");
    //   }
    // });

    // pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
