import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { SignInUpPage } from '../pages/sign-in-up/sign-in-up';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ApiServiceProvider } from '../providers/api-service/api-service';
import { GlobalServiceProvider } from '../providers/global-service/global-service';

@NgModule({
  declarations: [
    MyApp,
    SignInUpPage,
    ResetPasswordPage,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SignInUpPage,
    ResetPasswordPage,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiServiceProvider,
    GlobalServiceProvider
  ]
})
export class AppModule {}
