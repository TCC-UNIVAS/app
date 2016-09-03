import {Component} from '@angular/core';
import {HomePage} from '../home/home';
import {ReportCasePage} from '../report-case/report-case';
import {CasesPage} from '../cases/cases';
import {UserPage} from '../user/user';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  private tabRootHome: any;
  private tabRootReportCase: any;
  private tabRootCases: any;
  private tabRootUser: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tabRootHome = HomePage;
    this.tabRootReportCase = ReportCasePage;
    this.tabRootCases = CasesPage;
    this.tabRootUser = UserPage;
  }
}
