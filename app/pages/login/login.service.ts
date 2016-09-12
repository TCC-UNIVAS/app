import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class LoginService {
    constructor(private http : Http){
    }

    createUser() {}
   
    
    getUser(email, password, callback) {
        //TODO: recuperar user do serviço
        //return '{"name":"Daniela","email":"danielamaradms@gmail.com","password":"1234","latitude":"=22.123456","longitude":"-45.123456","sign_date":"2016-08-29 12:00:00"}';
        let body = JSON.stringify({ 'email' : email , 'password' : password });
       // let headers = new Headers({ 'Content-Type': 'application/json' });
        let headers = new Headers();
        headers.append("Content-Type","application/json");
        this.http.post('http://tcc-tccunivas.rhcloud.com/user/auth', body, {headers:headers}) 
            .toPromise().then(function(res: Response){
                var body = res.json();
                console.log(body);
                if(body != '{}')
                    callback(body);
                else
                    callback(false);
            });
    }

    updateUser() {}

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

    updateUserInLocalstorage() {}
}