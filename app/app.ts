import { Component } from '@angular/core';
import { Platform, ionicBootstrap } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { TabsPage } from './pages/tabs/tabs';
import { LoginPage } from './pages/login/login';
import { LoginService } from './pages/login/login.service';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [LoginService],
})
export class MyApp {
  private rootPage: any;

  constructor(private platform: Platform, private loginService: LoginService) {
    let user = this.loginService.getUserFromLocalstorage();
    if (user != undefined) {
      this.rootPage = TabsPage;
    } else {
      this.rootPage = LoginPage;
    }

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp);
