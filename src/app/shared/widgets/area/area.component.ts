import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { DashboardService } from 'src/app/modules/dashboard.service';


@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

  chartOptions: {};
  @Input() data: any = [];

  users: any  =[]
  Highcharts: typeof Highcharts = Highcharts;

  graficaPrueba:Highcharts.Options = {
    chart: {
      type: 'area'
    },
    title: {
      text: 'Casos Covid-19'
    },
    subtitle: {
      text: 'Europa'
    },
    tooltip: {
      split: true,
      valueSuffix: ' cases'
    },
    credits: {
      enabled: false
    },
    exporting: {
      enabled: true,
    },
    xAxis:{
      categories:[]
    },
    plotOptions: {
      area: {
          stacking: 'normal',
          lineColor: '#666666',
          lineWidth: 1,
          marker: {
              lineWidth: 1,
              lineColor: '#666666'
          }
      }
  },
    series: [
      {
         name:'Ecuador',
         data: [],
         type: 'area'
      },
      {
        name:'Peru',
        data: [18, 17, 20, 22, 21, 30, 70, 90, 14, 18,30,45,60],
        type: 'area'
     }
           ]
  };


  constructor( protected service:DashboardService ) { }

  ngOnInit() {
    this.service.getUsers()
    .subscribe(
      (data) => { // Success
        this.users = data;
        const datosGrafica = this.users.map(x => x.edad);
        const nombre = this.users.map(x  => x.nombre);

        //Highcharts
        this.graficaPrueba.series[0]['data'] = datosGrafica;
        this.graficaPrueba.xAxis['categories'] = nombre;
        Highcharts.chart('MediosdPPrincipal', this.graficaPrueba);

      },
      (err) => {
        console.error(err);
      }
    );


    
    HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

}
