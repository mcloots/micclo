import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DartsService } from '@micclo/darts-ui/services';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'micclo-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit, OnDestroy {
  code = '';
  name = '';
  getPlayerThrows$: Subscription = new Subscription();
  options: any;
  totalThrows = 0;
  percentages: string[][] = [];

  constructor(
    private dartsService: DartsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const code = params['playercode'];
      this.code = code;
      switch (code) {
        case '1989':
          //Michaël
          this.name = 'Michaël';
          break;
        case '1980':
          //Kristof
          this.name = 'Kristof';
          break;
        case '1354':
          //Wout
          this.name = 'Wout';
          break;
        case '3472':
          //Peter
          this.name = 'Peter';
          break;
        default:
          break;
      }
    });

    const xAxisData: number[] = [];
    const xAxisDataDoubleSingle: number[] = [];
    const data1: number[] = [];
    const data2: number[] = [];
    const data3: number[] = [];

    xAxisData.push(50);
    xAxisData.push(25);
    for (let i = 20; i > 0; i--) {
      xAxisData.push(i);
      xAxisDataDoubleSingle.push(i);
    }

    this.dartsService
      .getThrowsForPlayer(this.name, this.code)
      .subscribe((result) => {
        this.totalThrows = result[0].throws.length;
        this.options = {
          legend: {
            data: ['Single', 'Double', 'Triple'],
            align: 'left',
          },
          tooltip: {},
          xAxis: {
            data: xAxisData,
            silent: false,
            splitLine: {
              show: false,
            },
          },
          yAxis: {},
          series: [
            {
              name: 'Single',
              type: 'bar',
              data: data1,
            },
            {
              name: 'Double',
              type: 'bar',
              data: data2,
            },
            {
              name: 'Triple',
              type: 'bar',
              data: data3,
            },
          ],
        };

        const l25 = result[0].throws.filter((t) => t.isRedBull).length;
        this.percentages.push([
          '25',
          ((l25 / this.totalThrows) * 100).toFixed(2),
        ]);
        data1.push(l25);
        const l50 = result[0].throws.filter((t) => t.isGreenBull).length;
        this.percentages.push([
          '50',
          ((l50 / this.totalThrows) * 100).toFixed(2),
        ]);
        data1.push(l50);
        for (let i = 20; i > 0; i--) {
          const l = result[0].throws.filter(
            (t) => !t.isDouble && !t.isTriple && t.points == i
          ).length;

          this.percentages.push([
            i.toString(),
            ((l / this.totalThrows) * 100).toFixed(2),
          ]);
          data1.push(l);
        }

        data2.push(0);
        data2.push(0);
        data3.push(0);
        data3.push(0);
        for (let i = 20; i > 0; i--) {
          const l = result[0].throws.filter(
            (t) => t.isDouble && t.points == i
          ).length;

          this.percentages.push([
            'D' + i.toString(),
            ((l / this.totalThrows) * 100).toFixed(2),
          ]);
          data2.push(l);
        }

        for (let i = 20; i > 0; i--) {
          const l = result[0].throws.filter(
            (t) => t.isTriple && t.points == i
          ).length;

          this.percentages.push([
            'T' + i.toString(),
            ((l / this.totalThrows) * 100).toFixed(2),
          ]);

          data3.push(l);
        }

        //sort percentages
        this.percentages.sort(function (a, b) {
          return b[1].localeCompare(a[1], undefined, { numeric: true });
        });

        this.percentages = this.percentages.slice(0, 10);
      });
  }

  ngOnDestroy(): void {
    this.getPlayerThrows$.unsubscribe();
  }
}
