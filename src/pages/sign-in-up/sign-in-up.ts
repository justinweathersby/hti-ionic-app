import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { HomePage } from '../home/home';
/**
 * Generated class for the SignInUpPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-sign-in-up',
  templateUrl: 'sign-in-up.html',
})
export class SignInUpPage {

  isSignUp: boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
              public alertCtrl: AlertController, public loading: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInUpPage');
    this.isSignUp = false;
  }

  switchSignInUp(isSignUp) {
    this.isSignUp = isSignUp;
  }

  continue() {
    this.navCtrl.push(HomePage);
  }

  termsAndConditions() {
    let resetPassWordPage = this.modalCtrl.create(ResetPasswordPage);
    resetPassWordPage.onDidDismiss(data => {

    });
    resetPassWordPage.present();
  }

}
