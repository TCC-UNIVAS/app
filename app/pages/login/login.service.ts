import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { User } from './login.model';
import { Config } from '../../config/config';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
    private URL: string;

    constructor(private http: Http) {
        this.http = http;
        this.URL = Config.URL;
    }

    createUser() {}

    doLogin(email, password, callback) {   
        let _this = this;     
        var analiseReturn = function(user, thisLogin) {
            if (user) {
                _this.saveUserInLocalstorage(user);  
                var result: Array<string> = ['', 'true'];     
                callback(result);
            } else {
                var result: Array<string> = ['Não é possível fazer login!', 'false'];  
                 callback(result);
            }
        };
        this.getUser(email, password, analiseReturn);
    }

    getUser(email, password): Promise<User> {
        var user = {
            email: email,
            password: password
        };
        var url = this.URL + '/user/auth';
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(url, user, { headers: headers })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    saveUserInLocalstorage(user) {
        var userJson = JSON.stringify(user);
        console.log(userJson);
        window.localStorage.setItem('User', userJson);
    }

    getUserFromLocalstorage() {
        var userJson = window.localStorage.getItem('User');
        if (userJson) {
            return JSON.parse(userJson);
        } else {
            return null;
        }
    }

    handleError(error: any) {
        console.info('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}