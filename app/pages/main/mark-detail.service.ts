import { Config } from '../../config/config';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';

export class MarkDetailService {
    URL: string;

    constructor(private http: Http) {
        this.URL = Config.URL;
    }

    getDetail(case_id) {
        let url = this.URL + '/mark?caseId=' + case_id;
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