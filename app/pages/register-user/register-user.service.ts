import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { User } from '../login/login.model';
import { Config } from '../../config/config';
import 'rxjs/Rx';

@Injectable()
export class RegisterUser {
    private URL: string;

    constructor(private http: Http) {
        this.http = http;
        this.URL = Config.URL;
    }

    createUser(user) {
        debugger;
        var url = this.URL + '/user';
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(url, user, { headers: headers })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    handleError(error: any) {
        console.info('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}