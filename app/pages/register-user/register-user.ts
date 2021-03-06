import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { RegisterUser } from './register-user.service';
import { MapsPage } from '../maps/maps';

@Component({
  templateUrl: 'build/pages/register-user/register-user.html',
  providers: [RegisterUser],
})

export class RegisterUserPage {
  private loading: any;
  nameInvalid: boolean;
  emailInvalid: boolean;
  locationInvalid: boolean;
  passwordInvalid: boolean;
  confirmPasswordInvalid: boolean;
  noName: boolean;
  noLocation: boolean;
  noEmail: boolean;
  noPass: boolean;
  user: {
    name: string,
    email: string,
    location: string,
    lat: string,
    lng: string,
    password: string,
    confirm_password: string
  };

  constructor(private navCtrl: NavController, private registerUser: RegisterUser, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    this.loading;
    this.nameInvalid = true;
    this.emailInvalid = true;
    this.locationInvalid = true;
    this.passwordInvalid = true;
    this.confirmPasswordInvalid = true;
    this.noName = true;
    this.noLocation = true;
    this.noEmail = true;
    this.noPass = true;
    this.user = {
      name: '',
      email: '',
      location: '',
      lat: '',
      lng: '',
      password: '',
      confirm_password: ''
    };
  }

  createUser(user) {
    if (!this.validateFields(user)) {
      this.showAlert('Atenção!', 'É necessário preencher os campos corretamente.');
    } else {
      let userSend = this.mountSendData(user);
      let result = this.registerUser.createUser(userSend).then((data) => {
        this.presentLoading(true, 'Carregando...');
        this.registerUser.clearLocalStorage();
        this.registerUser.saveUserInLocalstorage(data);
        this.clearFields(user);
        this.presentLoading(false, 'Carregando...');
        this.navCtrl.pop();
        this.showAlert('Que bom!', 'Agora você pode ajudar Pouso Alegre a ficar livre do Aedes Aegypti!');
      }, (err) => {
        this.presentLoading(false, 'Carregando...');
        this.showAlert('Atenção!', 'Não foi possível criar sua conta. Tente novamente mais tarde.');
      }).catch((err) => {
        this.presentLoading(false, 'Carregando...');
        console.log(err);
      });
    }
  }

  mountSendData(user) {
    delete user['confirm_password'];
    delete user['location'];
    return user;
  }

  openMap() {
    //this.presentLoading(true, 'Aguarde...');
    new Promise((resolve, reject) => {
      this.navCtrl.push(MapsPage, { result: resolve }).then(() => { });
    }).then(data => {
      let response: any = data;
      response = JSON.parse(response);
      this.user.location = response.address;
      this.user.lat = response.latlng.lat;
      this.user.lng = response.latlng.lng;
    });
    //this.presentLoading(false, 'Aguarde...');
  }

  showAlert(title, content) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: content,
      buttons: ['OK']
    });
    alert.present();
  }

  clearFields(user) {
    delete user['name'];
    delete user['email'];
    delete user['password'];
  }

  presentLoading(showLoading, message) {
     if (showLoading) {
        this.loading = this.loadingCtrl.create({
            content: message,
            dismissOnPageChange: false
        });
        this.loading.present();
     } else {
        this.loading.dismiss();
     }
  }


  //*********************************VALIDATE**********************************************
  checkName(event) {
    this.noName = false;
    let name = event.target.value;
    if (name.length == 0 || name.length > 50) {
      this.nameInvalid = true;
    } else {
      this.nameInvalid = false;
    }
  }

  checkLocation(event) {
    this.noLocation = false;
    let locationLatLng = event.target.value;
    if (locationLatLng.length == 0) {
      this.nameInvalid = true;
    } else {
      this.nameInvalid = false;
    }
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

  checkPasswordEquals(event, user) {
    this.noPass = false;
    let confirmPassword = event.target.value;
    if (confirmPassword == user.password) {
      this.confirmPasswordInvalid = false;
    } else {
      this.confirmPasswordInvalid = true;
    }
  }

  validateFields(user) {
    var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    EMAIL_REGEXP.test(user.email) ? this.emailInvalid = false : null;
    return (!this.emailInvalid && !this.passwordInvalid);
  }
}
