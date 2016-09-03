import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {
    createUser() {}
    
    getUser(email, password) {
        //TODO: recuperar user do serviço
        //return '{"name":"Daniela","email":"danielamaradms@gmail.com","password":"1234","latitude":"=22.123456","longitude":"-45.123456","sign_date":"2016-08-29 12:00:00"}';
        return null;
    }

    updateUser() {}

    doLogin(email, password) {
        let user = this.getUser(email, password);
        if (user) {
            this.saveUserInLocalstorage(user);
            return ['', true];
        } else {
            return ['Não é possível fazer login!', false];
        }
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