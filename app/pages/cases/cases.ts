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

  constructor(private navCtrl: NavController, public loadingCtrl: LoadingController, private casesService: CasesService) {
    this.cases;
  }

  myCasesPage() {
    // let userId = 79;

    // this.presentLoading(true, 'Carregando...');
    // let result = this.casesService.getByUserId(userId).then((data) => {
    //   this.presentLoading(false, 'Carregando...');
    //   this.cases = data;
    //   this.navCtrl.push(MyCasesPage);
    // }, (err) => {
    //   this.presentLoading(false, 'Carregando...');
    //   //this.showAlert('Atenção!', 'Informe corretamente seus dados de acesso!');
    // }).catch((err) => {
    //   this.presentLoading(false, 'Carregando...');
    //   console.log(err);
    // });
    this.navCtrl.push(MyCasesPage);
  }

  allCasesPage() {
    this.presentLoading(true, 'Carregando...');
    this.navCtrl.push(MyCasesPage);
  }

  commonDiseasesPage() {
    this.presentLoading(true, 'Carregando...');
    this.navCtrl.push(MyCasesPage);
  }

   presentLoading(showLoading, message) {
     var loader: any;

     if (showLoading) {
        loader = this.loadingCtrl.create({
            content: message,
            dismissOnPageChange: false,
            duration: 500
        });
        loader.present();
     }
    //  else {
    //     loader.dismiss();
    //  }
  }
}
