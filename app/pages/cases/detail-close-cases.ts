import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CasesPage } from './cases';
import { CasesService } from './cases.service';
import { Geolocation } from 'ionic-native';

declare var google: any;

@Component({
  templateUrl: 'build/pages/cases/detail-close-cases.html',
  providers: [CasesService],
})

export class DetailCloseCasesPage {
  private case: any;
  directions: any;
  map: any;

  constructor(
      private navCtrl: NavController, 
      public alertCtrl: AlertController,
      private navParams: NavParams,
      private platform: Platform,
      private casesService: CasesService)
    {
        this.case = navParams.get('caso');
        this.initPage();
    }

    private initPage() {
        this.directions = { latitude: this.case.lat, longitude: this.case.lng };

        this.platform.ready().then(() => {
            this.loadMap();
        });
    }

    private loadMap() {
        let user = this.getUserFromLocalstorage();

        let mapOptions = {
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        let mapDiv = document.getElementById('route-map');

        this.map = new google.maps.Map(mapDiv, mapOptions);
        
        this.calculateRoute(user.lat, user.lng);
    }

    private calculateRoute(latitude: number, longitude: number) {
        let directionRenderer = new google.maps.DirectionsRenderer();
        directionRenderer.setMap(this.map);

        let origin = new google.maps.LatLng(latitude, longitude);
        let destination = new google.maps.LatLng(this.directions.latitude, this.directions.longitude);

        let directionsService = new google.maps.DirectionsService();

        let params = {
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode.WALKING
        };

        directionsService.route(params, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
               directionRenderer.setDirections(result); 
            }
        });
    }

    getUserFromLocalstorage() {
    var userJson = window.localStorage.getItem('User');
    if (userJson) {
        return JSON.parse(userJson);
    } else {
        return null;
    }
  }
}
