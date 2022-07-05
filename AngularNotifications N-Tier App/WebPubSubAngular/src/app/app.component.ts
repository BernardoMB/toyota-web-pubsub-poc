import { Component, OnInit } from '@angular/core';
import { WebsocketConnectionService } from './websocket-connection.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'WebPubSubAngular';
  myChart: any;

  constructor(private webSocketConnectionService: WebsocketConnectionService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    const x = [ 1, 2, 3, 4, 5, 6, ];
    const y = [0, 10, 5, 2, 20, 30, 45];
    const data = {
      labels: x,
      datasets: [{
        label: 'Measurement',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: y,
      }]
    };
    this.myChart = new Chart(
      'myChart',
      {
        type: 'line',
        data: data,
        options: {}
      }
    );
    this.webSocketConnectionService.getConnectionLink().subscribe(link => {
      const uri = link.uri;
      this.webSocketConnectionService.connect(uri).subscribe((msg) => {
        //console.log(msg);
        const newMeasurement = msg.Measurement;
        //console.log(this.myChart.data);
        const array = this.myChart.data.datasets[0].data;
        array.push(newMeasurement);
        array.shift();
        const labels = this.myChart.data.labels;
        labels.push(this.myChart.data.labels[this.myChart.data.labels.length - 1] + 1);
        labels.shift();
        this.myChart.data.datasets[0].data = array;
        this.myChart.data.labels = labels;
        this.myChart.update();
      });
    });
  }

  public changeData() {
    console.log(this.myChart.data);
    this.myChart.data.datasets[0].data = [20, 30, 15, 20, 1, 4, 15];
    this.myChart.data.labels = [ 7, 8, 9, 10, 11, 12, ];
    this.myChart.update();
  }

}
