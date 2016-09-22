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
        let dataComplete = this.getOtherFields(data);           
        var url = this.URL + '/mark';
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(url, dataComplete, { headers: headers })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
        
    }

    getOtherFields(data){
        let user = JSON.parse(window.localStorage.getItem("User"));
        data.user_id = user.user_id;
        // TODO: get a category
        data.category_id = 1;
        return data;
    }
    // saveUserInLocalstorage(user) {
    //     var userJson = JSON.stringify(user);
    //     window.localStorage.setItem('User', userJson);
    // }

    // clearLocalStorage() {
    //     window.localStorage.clear();
    // }

    // removeKeyInLocalstorage(key) {
    //     window.localStorage.removeItem(key);
    // }

    handleError(error: any) {
        console.info('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}