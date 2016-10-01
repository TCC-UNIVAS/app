import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { MyCasesPage } from './my-cases';
import { CasesService} from './cases.service';

@Component({
  templateUrl: 'build/pages/cases/close-cases.html',
  providers: [CasesService],
})

export class CloseCasesPage {
  private loading: any;

  constructor(private navCtrl: NavController, public loadingCtrl: LoadingController, private casesService: CasesService) {
  }

   presentLoading(showLoading, message) {
     if (showLoading) {
        this.loading = this.loadingCtrl.create({
            content: message,
            dismissOnPageChange: false
        });
        this.loading.present();
     } else {
        this.loading.dismiss();
     }
  }
}
