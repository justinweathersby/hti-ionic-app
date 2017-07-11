import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import * as Constants from '../constants/constants';

import { GlobalServiceProvider } from '../global-service/global-service';
/*
  Generated class for the ApiServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ApiServiceProvider {

  constructor(public http: Http, public globalServiceProvider: GlobalServiceProvider) {
    console.log('Hello ApiServiceProvider Provider');
  }

  /*--- Start SignIn Module ---*/

  signin(params) {

    let self = this;

    return new Promise((resolve, reject) => {
      var access_token = '';
      var client = '';
      let requestData = {
        email: params.email,
        password: params.password
      };
      let headers = new Headers({
        'Accept': 'application/json'
      });
      let options = new RequestOptions({headers: headers});
      console.log('signin request data: ', requestData);
      self.http.post(Constants.SERVER_URL + '/api/auth/sign_in', requestData, options)
      .map(res => {
        console.log('res.headers : ', res.headers);
        console.log('res.headers.get :', res.headers.get('Access-Token'));
        console.log('res.headers.get :', res.headers.get('Client'));
        access_token = res.headers.get('Access-Token');
        client = res.headers.get('Client');
        return res.json();
      })
      .subscribe(response => {
        console.log('success signin response : ', response);
        var data = {
          data: response.data,
          access_token: access_token,
          client: client
        }
        resolve(data);
      }, err => {
        console.log('signin failed: ', err);
        let error = JSON.parse(err._body);
        console.log('err parser: ', error);
        if (error.error != undefined)
          reject(error.error);
        else if (error.errors != undefined)
          reject(error.errors[0]);
      });

    });

  }

  /*--- End SignIn Module ---*/



  /*--- Start SignUp Module ---*/

  signup(params) {

    let self = this;

    return new Promise((resolve, reject) => {
      var access_token = '';
      var client = '';
      let requestData = {
        email: params.email,
        password: params.password
      };
      let headers = new Headers({
        'Accept': 'application/json',
      });
      let options = new RequestOptions({headers: headers});
      console.log('signup request data: ', requestData);
      self.http.post(Constants.SERVER_URL + '/api/auth', requestData, options)
      .map(res => {
        console.log('res.headers : ', res.headers);
        console.log('res.headers.get :', res.headers.get('Access-Token'));
        console.log('res.headers.get :', res.headers.get('Client'));
        access_token = res.headers.get('Access-Token');
        client = res.headers.get('Client');
        return res.json();
      })
      .subscribe(response => {
        console.log('success signup response : ', response);
        if (response.status == 'success') {
          var data = {
            data: response.data,
            access_token: access_token,
            client: client
          }
          resolve(data);
        }
        else
          reject('SignUp Failed. Please try again.');
      }, err => {
        console.log('signup failed: ', err);
        let error = JSON.parse(err._body);
        console.log('err parser: ', error);
        if (error.status == 'error') {
          reject(error.errors.full_messages[0]);
        } else {
          reject('SignUp Failed. Please try again.');
        }

      });

    });

  }

  /*--- End SignUp Module ---*/



  /*--- Start SignOut Module ---*/

  signout() {

    let self = this;

    return new Promise((resolve, reject) => {

      let body = {
        'access-token': this.globalServiceProvider.userData.access_token,
        'client': this.globalServiceProvider.userData.client,
        'uid': this.globalServiceProvider.userData.data.uid
      };
      // let headers = new Headers({
      //   'Accept': 'application/json',
      // });
      // let options = new RequestOptions({headers: headers});
      console.log('signup request data: ', body);
      let option = new RequestOptions({body: body});
      self.http.delete(Constants.SERVER_URL + '/api/auth/sign_out', option)
      .map(res => res.json())
      .subscribe(response => {
        console.log('success signup response : ', response);
        if (response.success == true) {
          resolve(response);
        }
        else
          reject('SignOut Failed. Please try again.');
      }, err => {
        console.log('SignOut Failed: ', err)
        if (err.errors != undefined) {
          reject(err.errors[0]);
        } else
          reject('SignOut Failed. Please try again.');
      });

    });

  }

  /*--- End SignOut Module ---*/


  /*--- Start Reset Password Module ---*/

  resetPassword(params) {

    let self = this;

    return new Promise((resolve, reject) => {

      let requestData = {
        email: params.email,
        redirect_url: params.redirect_url
      };
      let headers = new Headers({
        'Accept': 'application/json',
      });
      let options = new RequestOptions({headers: headers});
      console.log('resetPassword request data: ', requestData);
      self.http.post(Constants.SERVER_URL + '/api/auth/password', requestData, options)
      .map(res => res.json())
      .subscribe(response => {
        console.log('success signup response : ', response);
        if (response.success == true) {
          resolve(response.message);
        }
        else
          reject('SignUp Failed. Please try again.');
      }, err => {
        if (err.success == false) {
          resolve(err.errors[0]);
        }
        // console.log('signup failed: ', err);
        // let error = JSON.parse(err._body);
        // console.log('err parser: ', error);
        // if (error.status == 'error') {
        //   reject(error.errors.full_messages[0]);
        // } else {
        //   reject('SignUp Failed. Please try again.');
        // }

      });

    });

  }

  /*--- End Reset Password Module ---*/

}
