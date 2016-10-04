import { Component } from '@angular/core';
import { GraphsService } from './graphs-cases.service';


@Component({
    templateUrl: 'build/pages/cases/graphs-cases.html',
    providers: [GraphsService]
})

export class GraphsPage {
    data: any;
    items: any;

    constructor(private graphService: GraphsService) {
        this.items = [];
        this.showTable();
    }

    showTable() {
        this.graphService.getDataForTable().then((data) => {
            this.items = data;
            console.log(this.items);
        });
    }
}