import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import 'rxjs/Rx';

declare var google: any;

@Component({
  templateUrl: 'build/pages/maps/maps.html',
})

export class MapsPage implements OnInit {
    private myLocation: any;
    private map: any;
    private marker: any;
    private markers: any;
    private locationClicked: any;
    private loading: any;
    private presentLoading: any;
    private alertCtrl: any;
    private neighborhood: string;

    constructor(private nav: NavController, public param: NavParams, private alert: AlertController) {
        this.nav = nav;
        this.param = param;
        this.alertCtrl = alert;
        this.myLocation = this.loadPosition();
        this.map;
        this.marker;
        this.markers = [];
        this.locationClicked;
        this.neighborhood;
    }

    ngOnInit() { }

    savePosition() {
        if (this.marker != undefined) {
            let obj = { address: this.marker, latlng: this.locationClicked, neighborhood: this.neighborhood };
            this.param.get('result')(JSON.stringify(obj));
            this.nav.pop();
        } else {
            let alert = this.alertCtrl.create({
                title: 'Atenção',
                subTitle: 'Por favor, informe a localização!',
                buttons: ['OK']
            });
            alert.present();
        }
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
        this.map = map;

        var that = this;
        google.maps.event.addListener(map, 'click', function (element) {
            that.addMarker(element, map, that.markers);
        });
        console.log(this.map);
    }

    addMarker(myLocation, map, markers) {
        var geocoder = new google.maps.Geocoder();
        var location = { lat: myLocation.latLng.lat(), lng: myLocation.latLng.lng() };
        this.locationClicked = location;
        var that = this;

        geocoder.geocode({'location': location}, function (results, status) {
            {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0].address_components[3].long_name != 'Pouso Alegre') {
                       let alert = that.alertCtrl.create({
                            title: 'Atenção!',
                            subTitle: 'O endereço informado não corresponde à cidade de Pouso Alegre. Por favor, informe uma localidade  válida!',
                            buttons: [
                                {
                                    text: 'Ok',
                                    handler: data => {
                                    }
                                }
                            ]
                        });
                        alert.present();
                    } else {
                        var opts = {
                            map: map,
                            animation: google.maps.Animation.DROP,
                            position: location                            
                        };
                        var marker = new google.maps.Marker(opts);

                        markers.push(marker);

                        if (markers.length > 1) {
                            markers.forEach(data => data.setMap(null));
                            markers[markers.length - 1].setMap(map);
                            markers = [];
                        }

                        that.marker = results[0].formatted_address;
                        that.neighborhood = results[0].address_components[2].long_name;
                        let content =  '<h5>' + results[0].formatted_address + '</h5>';
                        let infoWindow = new google.maps.InfoWindow({
                            content: content
                        });

                        google.maps.event.addListener(marker, 'click', function () {
                            infoWindow.open(this.map, marker);
                        });
                    }
                }
            }
        });
    }
}

