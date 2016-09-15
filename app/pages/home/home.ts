import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { PushService } from '../push/push.service';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  constructor(private navCtrl: NavController, private pushService : PushService) {
    pushService.init();
  }
}
