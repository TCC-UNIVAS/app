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
        this.getImage();
        this.loading;
    }

  getImage() {
    if (!this.case.image) {
      this.hasImage = false;
    }
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
