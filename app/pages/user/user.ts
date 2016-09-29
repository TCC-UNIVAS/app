import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { LoginService } from '../login/login.service';

@Component({
  templateUrl: 'build/pages/user/user.html',
  providers: [LoginService],
})
export class UserPage {

  constructor(private navCtrl: NavController, private loginService: LoginService) {
  }

  doLogout() {
    this.navCtrl.push(LoginPage);
    this.loginService.clearLocalStorage();
  }
}
