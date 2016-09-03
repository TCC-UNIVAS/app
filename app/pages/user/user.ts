import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'build/pages/user/user.html',
})
export class UserPage {

  constructor(private navCtrl: NavController) {

  }

  doLogout() {
    this.navCtrl.push(LoginPage);
  }
}
