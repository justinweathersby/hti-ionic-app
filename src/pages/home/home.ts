import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: any;
  constructor(public navCtrl: NavController) {
    this.items = [
      'Home',
      'Location',
      'About',
      'Job Fair',
      'News',
      'Contact',
    ];
  }

}
