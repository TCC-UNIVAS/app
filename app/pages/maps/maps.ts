import { Component } from '@angular/core';
import { NavController, Platform, NavParams } from 'ionic-angular';

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

    constructor(private nav: NavController, private param: NavParams) {
        this.nav = nav;
        this.param = param;
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
            let obj = { address: this.marker, latlng: this.positionClicked };
            this.param.get('resolve')(JSON.stringify(obj));
            this.nav.pop();
        } else {
          alert('É necessário selecionar um local para prosseguir');
        }
    }

    loadPosition() {
        setTimeout(() => {
            new Promise((resolve, reject) => {
                let myPosition = { lat: -22.4133147, lng: -45.7968896 };
                this.creatMap(myPosition);
            });
        }, 200);
    }

    creatMap(myPosition) {
        let options = {
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: myPosition
        };
        let map = new google.maps.Map(document.getElementById('map'), options);
        this.map = map;

        //this.presentLoading(false, 'Carregando Mapa...');

        var that = this;
        google.maps.event.addListener(map, 'click', function (ele) {
            that.addMarker(ele, map, that.markers);
        });
    }

    addMarker(myPosition, map, markers) {
      
        var geocoder = new google.maps.Geocoder();
        var position = { lat: myPosition.latLng.lat(), lng: myPosition.latLng.lng() };
        this.positionClicked = position;
        var that = this;

        geocoder.geocode({ 'location': position }, function (results, status) {
            {
                if (status == google.maps.GeocoderStatus.OK) {
                    console.log(results[results.length - 3].address_components[0].long_name);

                    if (results[results.length - 3].address_components[0].long_name != 'Conceição dos Ouros') {
                      alert('É necessário selecionar um local dentro para prosseguir');
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
                        let content =  '<h4>Local Selecionado!</h4>';
                        let infoWindow = new google.maps.InfoWindow({
                            content: content
                        });

                        console.log('Adress: ' + results[0].formatted_address);

                        google.maps.event.addListener(marker, 'click', function () {
                            infoWindow.open(this.map, marker);
                        });
                    }
                }
            }
        });
    }
}

