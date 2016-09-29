import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Config } from '../../config/config';

@Injectable()
export class CasesService {
    private URL: string;

    constructor(private http: Http) {
        this.http = http;
        this.URL = Config.URL;
    }

    getByUserId(userId) {
        var url = this.URL + '/mark/user/?userId=' + userId;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get(url, { headers: headers })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    handleError(error: any) {
        console.info('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}