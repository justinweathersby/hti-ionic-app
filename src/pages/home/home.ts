import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { NativeStorage } from '@ionic-native/native-storage';
import { ApiServiceProvider } from '../../providers/api-service/api-service';

import { SignInUpPage } from '../sign-in-up/sign-in-up';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: any;
  err: any;

  constructor(public navCtrl: NavController, public iab: InAppBrowser, public alertCtrl: AlertController,
              public loading: LoadingController, public nativeStorage: NativeStorage,
              public apiServiceProvider: ApiServiceProvider) {
    this.items = [
      'Home',
      'Employee Portal',
      'Job Openings',
      'About',
      'Job Fair',
      'News'
    ];
    this.err = [];
  }

  navigateTo(item) {
    if (item == this.items[0]) {
      //navigateTo Home
      this.openWebView('https://www.htijobs.com/');
    } else if (item == this.items[1]) {
      //navigateTo Employee Portal
      this.openWebView('https://htijobs.securedportals.com/portal/employee_login.aspx');
    } else if (item == this.items[2]) {
      //navigateTo About
      this.openWebView('https://www.htijobs.com/about');
    } else if (item == this.items[3]) {
      //navigateTo 'Job Fair
      this.openWebView('https://www.htijobs.com/job-fairs');
    } else if (item == this.items[4]) {
      //navigateTo News
      this.openWebView('https://www.htijobs.com/news');
    } else if (item == this.items[5]) {
      //navigateTo Job Openings
      this.openWebView('https://www.htijobs.com/job-openings');
    }
  }

  contact() {
    this.openWebView('https://www.htijobs.com/locations');
  }

  locations() {
    this.openWebView('https://www.htijobs.com/contact');
  }


  openWebView(url) {
    let options ='location=no,toolbar=yes,hardwareback=yes';
    const browser = this.iab.create(url, '_blank', options);
  }

  signout() {

    let loader = this.loading.create({
      content: '',
    });
    loader.present();
    // let signOutData = {
    //   'access-token': '',
    //   'client': '',
    //   'uid': ''
    // }
    this.apiServiceProvider.signout().then(response => {
      loader.dismiss();
      this.nativeStorage.setItem('hti', null) .then(() => {
        console.log('Stored item!')
      }, error =>  {
        console.error('Error storing item', error);
      });
      this.navCtrl.setRoot(SignInUpPage);
    }, err => {
      this.err = [];
      this.err.push(err);
      this.alertErrorMessage();
      loader.dismiss();
    });

  }

  alertErrorMessage() {
    let errorMessage = '';
    this.err.forEach(item => {
      errorMessage += item + '\n';
    })

    let confirm = this.alertCtrl.create({
      title: 'Error',
      message: errorMessage,
      buttons: [
        {
          text: 'Confirm',
          handler: () => {
            console.log('Disagree clicked');
          }
        }
      ]
    });
    confirm.present();
  }
}
