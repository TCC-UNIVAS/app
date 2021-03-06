import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Platform } from 'ionic-angular';
import { CasesPage } from './cases';
import { DetailCloseCasesPage } from './detail-close-cases';
import { MyCasesPage } from './my-cases';
import { CasesService} from './cases.service';

@Component({
  templateUrl: 'build/pages/cases/close-cases.html',
  providers: [CasesService],
})

export class CloseCasesPage {
  private cases: any;
  private countCases: any;
  private classDiv: any;
  private loading: any;
  public hasCases: Boolean;

  constructor(private navCtrl: NavController, 
      public alertCtrl: AlertController, 
      public loadingCtrl: LoadingController, 
      private platform: Platform,
      private casesService: CasesService) 
  {
    this.cases = null;
    this.loading;
  }

  ngOnInit() {
    this.getCasesFromLastWeekByUserId();
  }

  getCasesFromLastWeekByUserId() {
    var user = this.getUserFromLocalstorage();

    if (user.user_id != null) {
      this.casesService.getCasesFromLastWeekByUserId(user.lat, user.lng, user.user_id).then((data) => {
        this.cases = data;
        this.setCategoryName();
        this.countCases = this.cases.length;
        this.setClassDivBasedCount();
      }, (err) => {
        this.showAlert('Atenção!', 'Não foi possível carregar os dados.Tente novamente mais tarde!');
        this.navCtrl.push(CasesPage);
      }).catch((err) => {
        console.log(err);
      });
    } else {
      this.showAlert('Atenção!', 'Não foi possível carregar os dados.Tente novamente mais tarde!');
      this.navCtrl.push(CasesPage);
    }
  }

  getUserFromLocalstorage() {
    var userJson = window.localStorage.getItem('User');
    if (userJson) {
        return JSON.parse(userJson);
    } else {
        return null;
    }
  }

  detailCasePage(caso1) {
    this.presentLoading(true, 'Carregando...');
    this.navCtrl.push(DetailCloseCasesPage, {
        caso: caso1
      }).then(() => {
        this.presentLoading(false, 'Carregando');
      });
  }

  setCategoryName() {
    for (var i = 0; i < this.cases.length; i++) {
      let category = this.cases[i].category_id;

      if (category == 1) {
        this.cases[i].category_name = 'Focos do mosquito Aedes aegypti';
      } else if (category == 2) {
        this.cases[i].category_name = 'Dengue';
      } else if (category == 3) {
        this.cases[i].category_name = 'Zica';
      } else {
        this.cases[i].category_name = 'Chikungunya';
      } 
    }
  }

  setClassDivBasedCount() {
    if (this.countCases == 0) {
      this.classDiv = 'box-green';
    } else if (this.countCases > 0 && this.countCases <= 3) {
      this.classDiv = 'box-yellow';
    } else {
      this.classDiv = 'box-red';
    }
  }

  getImage(image) {
    if (!image) {
      return '#ddd';
    }
    return 'url(' + image + ') center center / cover no-repeat';
  }

  showAlert(title, content) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: content,
      buttons: ['OK']
    });
    alert.present();
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
