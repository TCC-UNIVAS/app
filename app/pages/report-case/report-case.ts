import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController, LoadingController } from 'ionic-angular';
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
    address: string,
    user_id: number,
    category_id: number
    lat: number,
    lng: number,
    comments: string,
    picture: string,
    neighborhood: string
  };

  constructor(private navCtrl: NavController, private reportCase: ReportCase,private camera: ReportCaseCamera,
       public alertCtrl: AlertController, private actionSheetCtrl: ActionSheetController, private loadingCtrl: LoadingController) {
    this.locationInvalid = true;
    this.noLocation = true;
    this.data = {
        address: '',
        user_id: null,
        category_id: 1,
        comments: '',
        lat: null,
        lng: null,
        neighborhood: '',
        // conver the file png to base 64
        // picture: this.reportCase.convertTo64('../img/icon_camera.png')
        picture: 'img/icon_camera.jpg'    
    };
  }

  eraseImage() {
    this.data.picture = null;
  }

  saveCase(data) {    
      this.presentLoading(true, 'Salvando caso...');
      let result = this.reportCase.saveInBD(data, this.eraseFields);
      //this.showAlert('Sucesso!', 'Notificação realizada com sucesso!');
      
      //this.eraseFields();
    }
  
  openMap() {
    new Promise((resolve, reject) => {
      this.navCtrl.push(MapsPage, { result: resolve }).then(() => { });
    }).then(data => {
      let response: any = data;
      response = JSON.parse(response);
      this.data.address = response.address;
      this.data.lat = response.latlng.lat;
      this.data.lng = response.latlng.lng;
      this.data.neighborhood = response.neighborhood;
    });
  }

  redirectMyCasePage(data) {
    
  }
  
  showAlert(title, content) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: content,
      buttons: ['OK']
    });
    alert.present();
  }

  eraseFields(data) { 
    data.address = '';
    data.comments = '';
    data.picture = 'img/icon_camera.jpg';
  }

 presentLoading(showLoading, message) {
     var loader: any;
     if (showLoading) {
        loader = this.loadingCtrl.create({
            content: message,
            dismissOnPageChange: true,
            duration: 2500
        });
        loader.present();
     }
 }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Selecione uma opção',
      buttons: [
        {
          text: 'Tirar foto',
          handler: () => {
            this.camera.takePicture(this.data);
          }
        }, {
          text: 'Selecionar da galeria',
          handler: () => {
            this.camera.getFromGallery(this.data);
          }
        }, {
          text: 'Apagar foto',
          role: 'destructive',
          handler: () => {
            this.camera.erasePicture(this.data);
          }
        }
      ]
    });
    actionSheet.present();
  }
}