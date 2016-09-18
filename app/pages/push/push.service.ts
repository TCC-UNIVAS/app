import { Injectable } from '@angular/core';
import {Push} from 'ionic-native';
import { Http, Headers } from '@angular/http';
import { Config } from '../../config/config';
import 'rxjs/add/operator/map';

@Injectable()
export class PushService{
    private URL: string;
    
    constructor(private http: Http) {
        this.http = http;
        this.URL = Config.URL;
    }

    init(){
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
    }

    handleError(error: any) {
        console.info('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}

