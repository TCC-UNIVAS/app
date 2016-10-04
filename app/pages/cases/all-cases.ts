import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomeService } from '../home/home.service';
import { DetailCasePage } from '../cases/detail-case';

declare var google: any;
declare var MarkerClusterer: any;

@Component({
  templateUrl: 'build/pages/cases/all-cases.html',
  providers: [HomeService],
})

export class AllCasesPage {
  private markers: any;
  private mapAllCases: any;
  private URL: string;

  constructor(private navCtrl: NavController, private homeService: HomeService) {
    this.markers = [];
    this.mapAllCases;
  }

  ionViewWillEnter() {
    if (this.mapAllCases) {
      this.loadMarkers();
    } else {
      this.loadPosition();
    }
  }
  
  loadPosition() {
    setTimeout(() => {
      new Promise((resolve, reject) => {
        let myLocation = { lat: -22.2262223, lng: -45.9316904 };
        this.createMap(myLocation);
      });
    }, 200);
  }

  createMap(myLocation) {
    let mapOptions = {
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: myLocation
    };
    this.mapAllCases = new google.maps.Map(document.getElementById('mapAllCases'), mapOptions);
    this.mapAllCases.controls[google.maps.ControlPosition.RIGHT_TOP].push(
    document.getElementById('legend'));
    this.loadMarkers();
  }

  loadMarkers() {
    this.markers = [];
    var data = this.homeService.getMarkers().then((markers) => {

      for (var mark of markers) {
        let location = { lat: mark.lat, lng: mark.lng };

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

        var d = new Date(mark.create_date),
          date = [ d.getDate(),
          d.getMonth() + 1,
          d.getFullYear()].join('/') + '    ' +
            [d.getHours(),
              d.getMinutes()].join(':');

        var newMarker = new google.maps.Marker({
          id: mark.case_id,
          position: location,
          lat: mark.lat,
          lng: mark.lng,
          title: mark.name,
          icon: iconPath,
          address: mark.address,
          create_date: date,
          image: mark.image,
          comments: mark.comments,
          neighborhood: mark.neighborhood,
          name: mark.name
        });

        ((newMarker) => {
          let that = this;
          google.maps.event.addListener(newMarker, 'click', function (e) {
            that.navCtrl.push(DetailCasePage, {
              caso: newMarker
            });
          });
        })(newMarker);

        this.markers.push(newMarker);
      }

      var markerCluster = new MarkerClusterer(this.mapAllCases, this.markers, { imagePath: 'img/m/m' });
  });
  }
}