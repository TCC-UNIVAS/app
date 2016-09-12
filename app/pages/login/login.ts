import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { LoginService } from './login.service';
import { RegisterUserPage } from '../register-user/register-user';
import { MapsPage } from '../maps/maps';

@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [LoginService],
})

export class LoginPage {
  emailInvalid: boolean;
  passwordInvalid: boolean;
  noEmail: boolean;
  noPass: boolean;
  user: {
    name: string,
    email: string,
    password: string,
    latitude: string,
    longitude: string,
    sign_date: string
  };

  constructor(private navCtrl: NavController, private loginService: LoginService, public alertCtrl: AlertController) {
    this.emailInvalid = true;
    this.passwordInvalid = true;
    this.noEmail = true;
    this.noPass = true;
    this.user = {
      name: '',
      email: '',
      password: '',
      latitude: '',
      longitude: '',
      sign_date: ''
    };
  }

  checkEmail(event) {
    this.noEmail = false;
    this.user.email = event.target.value;
    var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    EMAIL_REGEXP.test(event.target.value) ? this.emailInvalid = false : this.emailInvalid = true;
  }

  checkPassword(event) {
    this.noPass = false;
    this.user.password = event.target.value;
    if (event.target.value.length < 3) {
      this.passwordInvalid = true;
    } else {
      this.passwordInvalid = false;
    }
  }

  validateFields(user) {
    var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    EMAIL_REGEXP.test(user.email) ? this.emailInvalid = false : null;
    return (!this.emailInvalid && !this.passwordInvalid);
  }

  doLogin(user) {
    if (!this.validateFields(user)) {
      console.log('Não permitido!');
    } else {
      let result = this.loginService.doLogin(user.email, user.password);
      if (result[1]) {
        this.navCtrl.push(TabsPage);
      } else {
        this.showAlert('Atenção!', result[0]);
      }
    }
  }

  showAlert(title, content) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: content,
      buttons: ['OK']
    });
    alert.present();
  }

  registerUser() {
    this.navCtrl.push(RegisterUserPage);
  }

  //*****************MAP**************
   openMap() {
    this.navCtrl.push(MapsPage);
  }
}
