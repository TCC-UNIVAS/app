import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { PushService } from '../push/push.service';
import { Push } from 'ionic-native';
import { MainMapService } from './main.service';
//import { MarkerClusterer } from 'markerclustererplus';
import { MarkDetailService } from './mark-detail.service';
//import { DetailCasePage } from '..cases/detail-case';

declare var google: any;

@Component({
  templateUrl: 'build/pages/main/main.html',
  providers: [MainMapService],
})

export class MainMap {
  private markers: any;
  private map: any;
  private URL: string;

  constructor(private navCtrl: NavController, private mainMapService: MainMapService) {
    //init the push service
    //this.pushService.init();  
    this.markers = [];
    this.map;


    this.loadPosition();
  }


  loadPosition() {
    setTimeout(() => {
      new Promise((resolve, reject) => {
        let myLocation = { lat: -22.2262223, lng: -45.9316904 };
        this.creatMap(myLocation);
      });
      //    Geolocation.getCurrentPosition().then((position) => {
      //         this.myLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      //         this.creatMap(this.myLocation);
      //     }, (err) => {
      //         console.log(err);
      // });

    }, 200);
  }

  creatMap(myLocation) {
    let mapOptions = {
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: myLocation
    };
    let map = new google.maps.Map(document.getElementById('map'), mapOptions);
    this.map = map;

    var data = this.mainMapService.getMarkers().then((data) => {
      this.loadMarkers(data);
    });
  }



  loadMarkers(markers) {
    console.log(markers);

    for (var mark of markers) {
      console.log('mark ' + mark);

      let location = { lat: mark.lat, lng: mark.lng };

      //select the icon by category
      let iconPath;
      switch (mark.category_id) {
        case 1:
          iconPath = 'img/case_foco.png';
          break;
        case 2:
          iconPath = 'img/case_dengue.png';
          break;
        case 3:
          iconPath = 'img/case_zika.png';
          break;
        case 4:
          iconPath = 'img/case_chikungunya.png';
          break;
      }

      var newMark = new google.maps.Marker({
        position: location,
        title: mark.name,
        icon: iconPath,
        map: this.map
      });

      
      // google.maps.event.addListener(newMark, 'click', (function (newMark, content, infowindow) {
      //   return function () {
      //     infowindow.setContent(content);
      //     infowindow.open(this.map, newMark);
      //   };
      // })(newMark, content, infowindow));
      google.maps.event.addListener(newMark, 'click', (newMark) => {
        this.navCtrl.push(detailCasePage, {
          mark: newMark 
        });
      });

      //add the new marker into the array markers
      this.markers.push(newMark);

    }
     


    //var markerCluster = new MarkerClusterer(this.map, markers);
  }
}