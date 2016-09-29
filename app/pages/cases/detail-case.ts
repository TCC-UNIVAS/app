import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CasesPage } from './cases';
import { CasesService } from './cases.service';

@Component({
  templateUrl: 'build/pages/cases/detail-case.html',
  providers: [CasesService],
})

export class DetailCasePage {
  private case: any;
  private loading: any;
  public hasImage: Boolean = true;

  constructor(
      private navCtrl: NavController, 
      public alertCtrl: AlertController, 
      public loadingCtrl: LoadingController, 
      private navParams: NavParams,
      private casesService: CasesService)
    {
        this.case = navParams.get('caso');
        this.mountMap();
        console.log('MAPA: ' + this.case.map);
        this.loading;
    }

  getImage() {
    /**
     DEPRECATED: com a inserção do mapa a tela de detalhes ficou evidentemente mais legível, 
     não sendo mais necessário o uso desta função nem do bloco de código HTML abaixo:
     <div class="box-image-empty" [hidden]="hasImage"></div>
     */
    if (!this.case.image) {
      this.hasImage = false;
    }
  }

  mountMap() {
    this.case.map = 'https://maps.googleapis.com/maps/api/staticmap?center=' + this.case.lat + ',' + 
      this.case.lng + '&zoom=18&size=400x200' + '&markers=color:red%7Clabel:S%7C' + 
      this.case.lat + ',' + this.case.lng + '&maptype=roadmap&key=AIzaSyCgNih6IMSYh-o0JkJoQGe9V-F_RQlOoC8';
  }



//   showAlert(title, content) {
//     let alert = this.alertCtrl.create({
//       title: title,
//       subTitle: content,
//       buttons: ['OK']
//     });
//     alert.present();
//   }

//   presentLoading(showLoading, message) {
//      if (showLoading) {
//         this.loading = this.loadingCtrl.create({
//             content: message,
//             dismissOnPageChange: false
//         });
//         this.loading.present();
//      } else {
//         this.loading.dismiss();
//      }
//   }
}
