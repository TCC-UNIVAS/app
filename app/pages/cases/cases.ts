import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { MyCasesPage } from './my-cases';
import { CloseCasesPage } from './close-cases';
import { CasesService} from './cases.service';
import { GraphsPage } from './graphs-cases';

@Component({
  templateUrl: 'build/pages/cases/cases.html',
  providers: [CasesService],
})

export class CasesPage {
  private cases: any;
  private loading: any;

  constructor(private navCtrl: NavController, public loadingCtrl: LoadingController, private casesService: CasesService) {
    this.cases;
    this.loading;
  }

  myCasesPage() {
    this.presentLoading(true, 'Carregando...');
    this.navCtrl.push(MyCasesPage).then(() => {
      this.presentLoading(false, 'Carregando');
    });
  }

  closeCasesPage() {
    this.presentLoading(true, 'Carregando...');
    this.navCtrl.push(CloseCasesPage).then(() => {
      this.presentLoading(false, 'Carregando');
    });
  }

  allCasesPage() {
    //alert('In Progress...');
    this.presentLoading(true, 'Carregando...');
    this.navCtrl.push(HomePage).then(() => {
      this.presentLoading(false, 'Carregando');
    });
  }

  commonDiseasesPage() {
   // alert('In Progress...');
    this.presentLoading(true, 'Carregando...');
    this.navCtrl.push(GraphsPage).then(() => {
      this.presentLoading(false, 'Carregando');
    });
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
