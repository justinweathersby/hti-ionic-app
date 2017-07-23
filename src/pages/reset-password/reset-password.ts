import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { ApiServiceProvider } from '../../providers/api-service/api-service';
/**
 * Generated class for the ResetPasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {

  resetForms: any;
  err: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController, public loading: LoadingController,
              public apiServiceProvider: ApiServiceProvider) {
    this.resetForms = {
      email: '',
      redirect_url: '/home'
    }
    this.err = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

  continue() {
    this.err = [];
    if (this.resetForms.email == '' )
      this.err.push('Email can\'t be blank');
    if (this.err.length != 0) {
      this.alertErrorMessage();
      return;
    }

    let loader = this.loading.create({
      content: '',
    });
    loader.present();

    this.apiServiceProvider.resetPassword(this.resetForms).then(response => {
      loader.dismiss();
      this.navCtrl.pop();
      this.alertMessage(response);
    }, err => {
      this.err = [];
      this.err.push(err);
      this.alertErrorMessage();
      loader.dismiss();
    });
  }

  back() {
    this.navCtrl.pop();
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

  alertMessage(msg) {
    let confirm = this.alertCtrl.create({
      title: 'Alert',
      message: msg,
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
