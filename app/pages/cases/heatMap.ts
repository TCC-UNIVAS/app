import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
//i'm using the homeService to reuse the code, but is needed change the name of the class
import { HomeService } from '../home/home.service';

declare var google: any;

@Component({
    templateUrl: 'build/pages/cases/heatMap.html',
    providers: [HomeService]
})

export class HeatMap {
    private markers: any;
    private heatMap: any;

    constructor(private navCtrl: NavController, private homeService: HomeService) {
        this.markers = [];
        this.heatMap;

        this.loadMarkers();
        //load the position and init the map
        //this.loadPosition();

    }
    loadPosition() {

        Geolocation.getCurrentPosition().then(result => {
            let myLocation = new google.maps.LatLng(result.coords.latitude, result.coords.longitude);
            this.createMap(myLocation);
        }, (err) => {
            console.log(err);
        });
    }

    createMap(myLocation) {
        let mapOptions = {
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: myLocation
        };
        let map = new google.maps.Map(document.getElementById('map'), mapOptions);

        this.heatMap = new google.maps.visualization.HeatmapLayer({
            data: this.markers,
            map: map
        });
        
        this.heatMap.set('radius',25);
        this.heatMap.set('dissipating', true);


    }

    loadMarkers() {
        this.markers = [];
        var data = this.homeService.getMarkers().then((markers) => {

            for (var mark of markers) {
                let location = new google.maps.LatLng(mark.lat, mark.lng);

                this.markers.push(location);
            }
            console.log(this.markers);
            this.loadPosition();
        });

    }
}
