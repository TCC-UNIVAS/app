import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CasesService} from './cases.service';

@Component({
  templateUrl: 'build/pages/cases/my-cases.html',
  providers: [CasesService],
})

export class MyCasesPage {
  private cases: any;

  constructor(private navCtrl: NavController, private casesService: CasesService) {
    this.cases;
  }

  ngOnInit() {
    this.getByUserId();
  }

  getByUserId() {
    let userId = 79;

    let result = this.casesService.getByUserId(userId).then((data) => {
      this.cases = data;
      console.log('DAta: ' + this.cases);
    }, (err) => {
      console.log(err);
      //this.showAlert('Atenção!', 'Informe corretamente seus dados de acesso!');
    }).catch((err) => {
      console.log(err);
    });
  }

  getImage(image) {
        if (!image) {
            return "#eee";
        }
        return 'url(' + image + ') center center / cover no-repeat';

    } 
}
