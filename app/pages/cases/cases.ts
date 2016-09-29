import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { MyCasesPage } from './my-cases';
import { CasesService} from './cases.service';

@Component({
  templateUrl: 'build/pages/cases/cases.html',
  providers: [CasesService],
})

export class CasesPage {
  private cases: any;
  private loading: any;

  constructor(private navCtrl: NavController, public loadingCtrl: LoadingController, private casesService: CasesService) {
    debugger;
    this.cases;
    this.loading;
  }

  ngAfterViewInit() {
    debugger;
    this.showTabs();
  }

  myCasesPage() {
    this.presentLoading(true, 'Carregando...');
    this.navCtrl.push(MyCasesPage).then(() => {
      this.presentLoading(false, 'Carregando');
    });
  }

  allCasesPage() {
    this.presentLoading(true, 'Carregando...');
    this.navCtrl.push(MyCasesPage).then(() => {
      this.presentLoading(false, 'Carregando');
    });
  }

  commonDiseasesPage() {
    this.presentLoading(true, 'Carregando...');
    this.navCtrl.push(MyCasesPage).then(() => {
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

  hideTabs() {
    document.querySelector('ion-tabbar')['style'].display = 'none';
  }

  showTabs() {
    document.getElementById('tabs-content')['style'].display = 'block';
    //document.querySelector('ion-tabbar')['style'].display = 'block';
  }
}
