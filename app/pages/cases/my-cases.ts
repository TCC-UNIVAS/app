import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CasesPage} from './cases';
import { CasesService} from './cases.service';

@Component({
  templateUrl: 'build/pages/cases/my-cases.html',
  providers: [CasesService],
})

export class MyCasesPage {
  private cases: any;
  private loading: any;

  constructor(private navCtrl: NavController, public alertCtrl: AlertController, private casesService: CasesService) {
    this.cases;
    this.loading;
  }

  ngOnInit() {
    this.getByUserId();
  }

  getByUserId() {
    var userId = this.getUserIdFromLocalstorage();

    if (userId != null) {
      this.casesService.getByUserId(userId).then((data) => {
        this.cases = data;
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

  getUserIdFromLocalstorage() {
    var userJson = window.localStorage.getItem('User');
    if (userJson) {
        return JSON.parse(userJson).user_id;
    } else {
        return null;
    }
  }

  getImage(image) {
    if (!image) {
      return '#eee';
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
}
