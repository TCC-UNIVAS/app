import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CasesPage } from './cases';
import { CasesService } from './cases.service';

@Component({
  templateUrl: 'build/pages/cases/detail-case.html',
  providers: [CasesService],
})

export class DetailCasePage {
  private case: any;
  public hasImage: Boolean = true;

  constructor(
      private navCtrl: NavController, 
      public alertCtrl: AlertController,
      private navParams: NavParams,
      private casesService: CasesService)
    {
        this.case = navParams.get('caso');
        this.mountMap();
    }

  mountMap() {
    this.case.map = 'https://maps.googleapis.com/maps/api/staticmap?center=' + this.case.lat + ',' + 
      this.case.lng + '&zoom=18&size=400x200' + '&markers=color:red%7Clabel:S%7C' + 
      this.case.lat + ',' + this.case.lng + '&maptype=roadmap&key=AIzaSyCgNih6IMSYh-o0JkJoQGe9V-F_RQlOoC8';
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
}
