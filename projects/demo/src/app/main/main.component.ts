import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css', './table.component.css']
})
export class MainComponent implements OnInit {
  public basicSelectorChart = '';
  public combinationSelectorChart = '[isStacked]="\'true\'"';
  public groupSelectorChart = '[isGroup]="\'true\'"';

  public chartData = [
    // {
    //   name: 'General Infromation',
    //   route: 'general'
    // },
    {
      name: 'Configure',
      type: '',
      route: 'configure',
      html: this.basicSelectorChart,
      label: 'Support',
      data: 'Support',
      title: 'Support',
      types: 'Support',
      yaxisLabelFormatter: ''
    },
    {
      name: 'Configure Highstock',
      type: '',
      route: 'configure-stock',
      html: this.basicSelectorChart,
      label: 'Support',
      data: 'Support',
      title: 'Support',
      types: 'Support',
      yaxisLabelFormatter: ''
    }
  ];
  constructor(private router: Router) {}

  ngOnInit() {}

  redirectToPage(d) {
    this.router.navigate([d['route']]);
  }
}
