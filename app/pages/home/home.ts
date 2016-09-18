import {Component,ViewChild} from '@angular/core';
import {NavController} from 'ionic-angular';
import { PushService } from '../push/push.service';
import {Push} from 'ionic-native';
import { Http, Headers } from '@angular/http';


@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [PushService],
})

export class HomePage {

  private URL: string;
  constructor(private navCtrl: NavController, private http: Http, private pushService: PushService) {
  
   this.pushService.init();

    
  }
}