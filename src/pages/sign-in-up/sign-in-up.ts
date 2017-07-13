import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController, LoadingController } from 'ionic-angular';

import { NativeStorage } from '@ionic-native/native-storage';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';

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
  signForm: any;
  err: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
              public alertCtrl: AlertController, public loading: LoadingController, public nativeStorage: NativeStorage,
              public apiServiceProvider: ApiServiceProvider, public globalServiceProvider: GlobalServiceProvider) {
    this.isSignUp = false;
    this.signForm = {
      username: '',
      email: '',
      password: ''
    }
    this.err = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInUpPage');

  }

  switchSignInUp(isSignUp) {
    this.isSignUp = isSignUp;
  }

  continue() {
    if (this.isSignUp) {
      this.signup();
    } else {
      this.signin();
    }
    //this.navCtrl.push(HomePage);
  }

  bottomBtnClick() {
    if(this.isSignUp) {
      this.termsAndConditions();
    } else {
      this.navigateToResetPassword();
    }
  }

  termsAndConditions() {

  }

  navigateToResetPassword() {
    let resetPassWordPage = this.modalCtrl.create(ResetPasswordPage);
    resetPassWordPage.onDidDismiss(data => {

    });
    resetPassWordPage.present();
  }

  signin() {
    this.err = [];
    if (this.signForm.email == '' )
      this.err.push('Email can\'t be blank');
    if (this.signForm.password == '')
      this.err.push('Password can\'t be blank');
    if (this.err.length != 0) {
      this.alertErrorMessage();
      return;
    }

    let loader = this.loading.create({
      content: '',
    });
    loader.present();

    this.apiServiceProvider.signin(this.signForm).then(response => {
      this.globalServiceProvider.userData = response;
      loader.dismiss();
      this.nativeStorage.setItem('hti', {userData: response}) .then(() => {
        console.log('Stored item!, ', response);
      }, error =>  {
        console.error('Error storing item', error);
      });

      this.navCtrl.push(HomePage);
    }, err => {
      this.err = [];
      this.err.push(err);
      this.alertErrorMessage();
      loader.dismiss();
    });
  }

  signup() {
    this.err = [];
    // if (this.signForm.username == '' )
    //   this.err.push('Username can\'t be blank');
    if (this.signForm.email == '')
      this.err.push('Email can\'t be blank');
    if (this.signForm.password == '')
      this.err.push('Password can\'t be blank');
    if (this.signForm.confirmpassword == '')
        this.err.push('Confirm Password can\'t be blank');
    if (this.signForm.password != this.signForm.confirmpassword)
          this.err.push('Confirm Password and Password should be equal');
    if (this.err.length != 0) {
      this.alertErrorMessage();
      return;
    }

    let loader = this.loading.create({
      content: '',
    });
    loader.present();

    this.apiServiceProvider.signup(this.signForm).then(response => {
      this.globalServiceProvider.userData = response;
      loader.dismiss();
      this.nativeStorage.setItem('hti', {userData: response}) .then(() => {
        console.log('Stored item!, ', response);
      }, error =>  {
        console.error('Error storing item', error);
      });
      this.navCtrl.push(HomePage);
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
