import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { ReportCase } from './report-case.service';
import { ReportCaseCamera } from './report-case-cam.service';
import { MapsPage } from '../maps/maps';

@Component({
  templateUrl: 'build/pages/report-case/report-case.html',
  providers: [ReportCase, ReportCaseCamera],
})

export class ReportCasePage {
  locationInvalid: boolean;
  noLocation: boolean;
   data: {
    location: string,
    user_id: number,
    category_id: number
    lat: number,
    lng: number,
    comments: string,
    picture: string   
  };

  constructor(private navCtrl: NavController, private reportCase: ReportCase,private camera: ReportCaseCamera, public alertCtrl: AlertController) {
    this.locationInvalid = true;
    this.noLocation = true;
    this.data = {
        location: '',
        user_id: null,
        category_id: null,
        comments: '',
        lat: null,
        lng: null,
        picture: null        
    }
  }


  eraseImage(){
    this.data.picture = null;
  }


  saveCase(data) {    
      this.clearFields(data);
      let result = this.reportCase.saveInBD(data);
      this.eraseFields();
    }
  

  openMap() {
    new Promise((resolve, reject) => {
      this.navCtrl.push(MapsPage, { result: resolve }).then(() => { });
    }).then(data => {
      let response: any = data;
      response = JSON.parse(response);
      this.data.location = response.address;
      this.data.lat = response.latlng.lat;
      this.data.lng = response.latlng.lng;
    });
  }

  showAlert(title, content) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: content,
      buttons: ['OK']
    });
    alert.present();
  }

  eraseFields(){
    let field = <HTMLInputElement>document.getElementById('location');
    field.value = '';
    field = <HTMLInputElement>document.getElementById('comments');
    field.value = '';
    this.data.picture = null;
  }

  clearFields(data) {
    delete data['location'];
  }

  takePic() {
    console.log(this.data);
    this.camera.takePicture(this.data);
  }
}
