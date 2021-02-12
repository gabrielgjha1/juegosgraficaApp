import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { JuegosService } from '../../serives/juegos.service';

@Component({
  selector: 'app-topjuegos',
  templateUrl: './topjuegos.component.html',
  styleUrls: ['./topjuegos.component.css']
})
export class TopjuegosComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{ ticks: {
      fontFamily: "Montserrat",
      reverse : false,
      min:  0,

  },}] },
  };
  public barChartLabels: Label[] = ['200'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[]=[];
  // { data: [100], label: 'Series C' },

  mostrar:boolean= false;
   constructor(private JuegoService:JuegosService) { }

  ngOnInit(): void {
    this.traerTOpJuegos();
  }

  public randomize(): void {
    this.barChartData.pop();
    this.barChartData.pop();
    this.barChartData.pop();
    this.traerTOpJuegos();

  }


  public traerTOpJuegos(){



    this.JuegoService.traerTop3Juegos().subscribe(resp=>{
      this.mostrar = true
      resp.forEach(element => {

        this.barChartData.push({ data: [element.voto_count], label: element.nombre });

      });


    })

  }

}
