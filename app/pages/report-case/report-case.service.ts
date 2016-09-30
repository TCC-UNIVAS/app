import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Config } from '../../config/config';

@Injectable()
export class ReportCase {
    private URL: string;

    constructor(private http: Http) {
        this.http = http;
        this.URL = Config.URL;
    }

    saveInBD(data) {
        debugger;
        let dataComplete = this.getOtherFields(data);  
        //test if the user selected no picture, in this case set the field picture to ''
        if (data.picture == 'img/icon_camera.jpg') {
            data.picture = 'img/fundo_img.jpg';
            this.convertTo64(data);
        } else {
            this.sendToServer(data);
        }
    }

    sendToServer(data) {
        debugger;
        var url = this.URL + '/mark';
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(url, data, { headers: headers })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    handleError(error: any) {
        console.info('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    getOtherFields(data) {
        let user = JSON.parse(window.localStorage.getItem("User"));
        data.user_id = user.user_id;
        return data;
    }    

    // convert the default image png to base64
    convertTo64(data) {
        var img = data.picture;
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.open('GET', img);
        xhr.send();
        var _this = this;
        xhr.onload = function() {
            var reader = new FileReader();
            reader.onloadend = () => {
                data.picture = reader.result;
                _this.sendToServer(data);
            };
            reader.readAsDataURL(xhr.response);
        };
    }
}



 