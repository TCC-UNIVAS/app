import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import 'rxjs/Rx';

declare var google: any;

@Component({
  templateUrl: 'build/pages/maps/maps.html',
})

export class MapsPage {
    private myPosition: any;
    private map: any;
    private marker: any;
    private markers: any;
    private positionClicked: any;
    private loading: any;
    private presentLoading: any;
    private alertCtrl: any;

    constructor(private nav: NavController, private param: NavParams, private alert: AlertController) {
        this.nav = nav;
        this.param = param;
        this.alertCtrl = alert;
        this.myPosition = this.loadPosition();
        this.map;
        this.marker;
        this.markers = [];
        this.positionClicked;
    }

    ngOnInit() {
        this.presentLoading = this.param.get('loading');
        this.loading = this.param.get('dismiss');
    }

    savePosition() {
        if (this.marker != undefined) {
            debugger;
            let obj = { address: this.marker, latlng: this.positionClicked };
            this.param.get('resolve')(JSON.stringify(obj));
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
        setTimeout(() => {
            new Promise((resolve, reject) => {
                let myPosition = { lat: -22.2262223, lng: -45.9316904 };
                this.creatMap(myPosition);
            });
            // Geolocation.getCurrentPosition().then((resp) => {
            //     let myPosition = { lat: resp.coords.latitude, lng: resp.coords.longitude };
            // });
        }, 200);
    }

    creatMap(myPosition) {
        let options = {
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: myPosition
        };
        let map = new google.maps.Map(document.getElementById('map'), options);
        this.map = map;

        var that = this;
        google.maps.event.addListener(map, 'click', function (element) {
            that.addMarker(element, map, that.markers);
        });
    }

    addMarker(myPosition, map, markers) {
        var geocoder = new google.maps.Geocoder();
        var position = { lat: myPosition.latLng.lat(), lng: myPosition.latLng.lng() };
        this.positionClicked = position;
        var that = this;

        geocoder.geocode({'location': position}, function (results, status) {
            {
                if (status == google.maps.GeocoderStatus.OK) {
                    console.log(results[results.length - 3].address_components[0].long_name);

                    if (results[results.length - 3].address_components[0].long_name != 'Pouso Alegre') {
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
                            position: position
                        };
                        var marker = new google.maps.Marker(opts);

                        markers.push(marker);

                        if (markers.length > 1) {
                            markers.forEach(data => data.setMap(null));
                            markers[markers.length - 1].setMap(map);
                            markers = [];
                        }

                        that.marker = results[0].formatted_address;
                        let content =  '<p>' + results[0].formatted_address + '</p>';
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

