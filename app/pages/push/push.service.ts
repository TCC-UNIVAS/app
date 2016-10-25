import { Injectable, Component } from '@angular/core';
import {Push} from 'ionic-native';
import { Http, Headers } from '@angular/http';
import { Config } from '../../config/config';
import { DetailCloseCasesPage } from '../cases/detail-close-cases';
import { NavController, AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';


@Injectable()
export class PushService {
  private URL: string;

  constructor(private http: Http, private navCtrl: NavController, public alertCtrl: AlertController) {
    this.http = http;
    this.URL = Config.URL;
  }

  init() {
    var push = Push.init({
      android: {
        senderID: "256530126858"
      },
      ios: {
        alert: "true",
        badge: true,
        sound: 'false'
      },
      windows: {}
    });

    push.on('registration', (data) => {
      let token = data.registrationId;
      let user = JSON.parse(window.localStorage.getItem("User"));
      let json = JSON.stringify({
        'token': token,
        'email': user.email
      });
      console.log(json);
      let URL = this.URL + '/user/token';
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(URL, json, { headers: headers })
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);

      console.log(data.registrationId);
    });

    push.on('notification', (data) => {
      console.log('Dattta: ' + JSON.stringify(data));
      console.log('Dattta: ' + JSON.stringify(data.additionalData));
      let additionalData = JSON.parse(JSON.stringify(data.additionalData));
      console.log(additionalData.case);
      var actualCase = additionalData.case;
      // alert(data.message);
      // this.navCtrl.push(DetailCloseCasesPage, {
      //   caso: actualCase[0]
      // });

      // var choose = confirm(data.message);
      // if (choose == true) {
      //   this.navCtrl.push(DetailCloseCasesPage, {
      //     caso: actualCase[0]
      //   });
      // }
      let confirm = this.alertCtrl.create({
        title: 'Novo caso registrado',
        message: data.message,
        buttons: [
          {
            text: 'Sim',
            handler: () => {
              console.log('selecionou sim');
              this.navCtrl.push(DetailCloseCasesPage, {
                caso: actualCase[0]
              });
            }
          },
          {
            text: 'Não',
            handler: () => {
              console.log('selecionou não');
            }
          }
        ]
      });
      confirm.present();

    });

    push.on('error', (e) => {
      console.log(e.message);
      alert(e.message);
    });
  }

  handleError(error: any) {
    console.info('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}

