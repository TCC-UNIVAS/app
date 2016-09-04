import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterUser } from './register-user.service';

@Component({
  templateUrl: 'build/pages/register-user/register-user.html',
  providers: [RegisterUser],
})

export class RegisterUserPage {
  user: {
    name: string,
    email: string,
    location: string,
    password: string,
    confirm_password: string
  };

  constructor(private navCtrl: NavController, private registerUser: RegisterUser) {
    this.user = {
      name: '',
      email: '',
      location: '',
      password: '',
      confirm_password: ''
    };
  }

  createUser(user) {
    let userSend = this.mountSendData(user);
    let result = this.registerUser.createUser(userSend);
    if (result['status'] == 200) {
      console.log('User criado!!!');
    } else {
      console.log('Error :/');
    }
  }

  mountSendData(user) {
    let location = user.location.split(';');
    user.lat = location[0];
    user.lng = location[1];
    delete user['confirm_password'];
    delete user['location'];
    return user;
  }
}
