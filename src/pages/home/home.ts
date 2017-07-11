import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { ApiServiceProvider } from '../../providers/api-service/api-service';

import { SignInUpPage } from '../sign-in-up/sign-in-up';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: any;
  err: any;

  constructor(public navCtrl: NavController, public iab: InAppBrowser,
              public alertCtrl: AlertController, public loading: LoadingController,
              public apiServiceProvider: ApiServiceProvider) {
    this.items = [
      'Home',
      'Location',
      'About',
      'Job Fair',
      'News',
      'Contact',
    ];
    this.err = [];
  }

  navigateTo(item) {
    if (item == this.items[0]) {
      //navigateTo Home
      this.openWebView('https://www.htijobs.com/');
    } else if (item == this.items[1]) {
      //navigateTo Location
      this.openWebView('https://www.htijobs.com/locations');
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
      //navigateTo Contact
      this.openWebView('https://www.htijobs.com/contact');
    }
  }

  employee() {
    this.openWebView('https://htijobs.securedportals.com/portal/employee_login.aspx');
  }

  job() {
    this.openWebView('https://www.htijobs.com/job-openings');
  }

  phone() {
    //this.openWebView('');
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
