import { StudentService } from 'src/app/services/student.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  chartdata: any;
  labeldata: any[] = [];
  realdata: any[] = [];
  ageData: any[] = []; 
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:8888/api/department-student-count')
      .subscribe(
        data => {
          this.chartdata = data;
          console.log(this.chartdata);

          if (this.chartdata != null) {
            for (let i = 0; i < this.chartdata.length; i++) {
              this.labeldata.push(this.chartdata[i].departmentName);
              this.realdata.push(this.chartdata[i].numberOfStudents);
              
            }
            console.log(this.labeldata);
            console.log(this.realdata);
            this.RenderChart();
            this.RenderPieChart();
            this.RenderAgeChart();
          }
        },
        error => {
          console.error('Error fetching chart data:', error);
        }
      );
      
  }
  RenderChart() {
    new Chart("myChart", {
      type: 'bar',
      data: {
        labels: this.labeldata,
        datasets: [{
          label: 'Number of Students',
          data: this.realdata,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            display: true,
          }
        }
      }
    });
    
  }
  RenderPieChart(){
    new Chart("myPieChart", {
      type: 'pie',
      data: {
        labels: this.labeldata,
        datasets: [{
          label: 'Percentage of Students',
          data: this.calculatePercentage(this.realdata),
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            display: true,
          }
        }
      }
    });
  
  }
  calculatePercentage(data: (number | string)[]): number[] {
    const numericData: number[] = data.map(value => (typeof value === 'string' ? parseFloat(value) : value));
    const total = numericData.reduce((acc, value) => acc + value, 0);
    return numericData.map(value => (value / total) * 100);
  }

 RenderAgeChart() {
  new Chart("ageChart", {
    type: 'line',
    data: {
      labels: this.labeldata, // Use departments as labels for the x-axis
      datasets: [{
        label: 'Number of Students by Age',
        data: this.realdata,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          display: true,
        }
      }
    }
  });
}

  
}
