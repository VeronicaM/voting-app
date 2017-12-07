import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartsModule } from 'ng2-charts-x';
@Component({
  selector: 'app-chart-display',
  templateUrl: './chart-display.html',
  styleUrls: ['./chart-display.scss'],
})
export class ChartDisplayComponent implements OnChanges {
  // Pie
  @Input() labels: string[];
  @Input() data: number[];
  public type = 'pie';
  labelsArray;
  dataArray;
  updated = false;
  ngOnChanges(changes: SimpleChanges) {
    if (this.labelsArray && this.dataArray) {
      this.labelsArray.length = 0;
      this.dataArray.length = 0;
    }
    this.labelsArray = [...changes.labels.currentValue];
    this.dataArray = [...changes.data.currentValue];
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
