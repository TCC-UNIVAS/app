import { Injectable } from '@angular/core';
import {Push} from 'ionic-native';
import { Http } from '@angular/http';

@Injectable()
export class PushService{
     constructor(private http: Http) {

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
        this.http.post('tcc-tccunivas.rhcloud.com/addUser',token);
        console.log(data.registrationId);
        alert(data.registrationId);
      });

      push.on('notification', (data) => {
        /*console.log(data.message);
        console.log(data.title);
        console.log(data.count);
        console.log(data.sound);
        console.log(data.image);
        console.log(data.additionalData);*/
        console.log(data);
        alert(data.message);
      });

      push.on('error', (e) => {
        console.log(e.message);
        alert(e.message);
      });
    };
}

