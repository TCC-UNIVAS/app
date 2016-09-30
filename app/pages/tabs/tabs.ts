import {Component} from '@angular/core';
import { MainMap } from '../main/main';
import {ReportCasePage} from '../report-case/report-case';
import {CasesPage} from '../cases/cases';
import {UserPage} from '../user/user';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  private tabRootMain: any;
  private tabRootReportCase: any;
  private tabRootCases: any;
  private tabRootUser: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tabRootMain = MainMap;
    this.tabRootReportCase = ReportCasePage;
    this.tabRootCases = CasesPage;
    this.tabRootUser = UserPage;
  }
}
