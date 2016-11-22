import { Component } from '@angular/core';
import { GraphsService } from './graphs-cases.service';

declare var FusionCharts: any;

@Component({
    templateUrl: 'build/pages/cases/graphs-cases.html',
    providers: [GraphsService]
})

export class GraphsPage {
    data: any;
    items: any;

    // createChart(data) {
    //     console.log(data);
    //     FusionCharts.ready(function () {
    //         var revenueChart = new FusionCharts({
    //             type: 'column2d',
    //             renderAt: 'chart',
    //             width: '100%',
    //             height: '450',
    //             dataFormat: 'json',
    //             dataSource: {
    //                 //data
    //                 chart: {
    //                     caption: "Quantidade po tipos de casos",
    //                     numberPrefix: "",
    //                     paletteColors: "#0075c2,#1aaf5d,#f2c500,#f45b00,#8e0000"
    //                 },
    //                  data: [this.data]
    //                 //     "{ 'label': 'Dengue', 'value': '9'}",
    //                 //     "{ 'label': 'Foco de mosquito', 'value': '34'}",
                    
    //             }
    //         }).render();

    //     });
    // };

    constructor(private graphService: GraphsService) {
        this.items = [];
        this.showTable();
        // this.graphService.getDataTypeCases().then((data) => {
        //     this.createChart(data);
        // })

    }

    showTable() {
        this.graphService.getDataForTable().then((data) => {
            this.items = data;
            console.log(this.items);
        });
    }
}