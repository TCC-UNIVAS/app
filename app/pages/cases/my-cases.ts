import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CasesPage } from './cases';
import { DetailCasePage } from './detail-case';
import { CasesService} from './cases.service';

@Component({
  templateUrl: 'build/pages/cases/my-cases.html',
  providers: [CasesService],
})

export class MyCasesPage {
  private cases: any;
  private loading: any;
  public hasCases: Boolean;

  constructor(private navCtrl: NavController, public alertCtrl: AlertController, public loadingCtrl: LoadingController, private casesService: CasesService) {
    this.cases = null;
    this.loading;
    this.hasCases = true;
  }

  ngOnInit() {
    try {
      this.getByUserId();
      this.hideTabs();
    } catch (error) {
      console.log(error);
    } 
  }

  getByUserId() {
    var userId = this.getUserIdFromLocalstorage();

    if (userId != null) {
      this.casesService.getByUserId(userId).then((data) => {
        this.cases = data;
        if (this.cases == 0) {
          this.hasCases = false;
        }
      }, (err) => {
        this.showAlert('Atenção!', 'Não foi possível carregar os dados.Tente novamente mais tarde!');
        this.navCtrl.push(CasesPage);
        this.showTabs();
      }).catch((err) => {
        console.log(err);
      });
    } else {
      this.showAlert('Atenção!', 'Não foi possível carregar os dados.Tente novamente mais tarde!');
      this.navCtrl.push(CasesPage);
      this.showTabs();
    }
  }

  getUserIdFromLocalstorage() {
    var userJson = window.localStorage.getItem('User');
    if (userJson) {
        return JSON.parse(userJson).user_id;
    } else {
        return null;
    }
  }

  detailCasePage(caso1) {
    this.presentLoading(true, 'Carregando...');
    this.navCtrl.push(DetailCasePage, {
        caso: caso1
      }).then(() => {
        this.presentLoading(false, 'Carregando');
      });
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

  hideTabs() {
    document.querySelector('ion-tabbar')['style'].display = 'none';
  }

  showTabs() {
    document.querySelector('ion-tabbar')['style'].display = 'flex';
  }
}
