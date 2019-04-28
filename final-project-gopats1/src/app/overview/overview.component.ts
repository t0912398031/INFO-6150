import { Component, OnInit, Input } from '@angular/core';
import { testuser } from '../testUser';
import { SharingService } from '../service/sharing.service';
import { BankService } from "../service/bank-service.service";
import { BudgetService } from '../service/budget.service';
import { elementStyling } from '@angular/core/src/render3';
import { User } from '../model/user';
import { Account } from '../model/account';
import { ChangeDetectorRef } from '@angular/core';
import * as CanvasJS from '../canvasjs.min';
import * as $ from 'jquery';
declare const Waypoint: any;

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  [x: string]: any;

  // boo: boolean = true;
  user: User;
  account: any;
  accounts: any;
  trans;
  budgets = [
    ['Total', 0],
    ['Grocery', 0],
    ['Gas', 0],
    ['Others', 0]
  ];
  spend = {
    Total: 0,
    Grocery: 0,
    Gas: 0,
    Others: 0
  };
  forChart = {
    Total: 0,
    Grocery: 0,
    Gas: 0,
    Others: 0
  };

  constructor(private sharingService: SharingService, private budgetService: BudgetService, private transService: BankService, private cdref: ChangeDetectorRef) { }

  ngAfterContentChecked() {
    this.accounts = this.sharingService.fetchAccount();
    // this.user = this.sharingService.fetch();
    this.account = this.sharingService.fetchCurrentAcc();

    if (this.account == undefined || this.account.length == 0){
      $("#chartContainer").hide();
      return;
    }
    this.trans = this.account.transactions;
    this.getSpend();
    if (this.trans.length > 2) this.trans = this.trans.slice(0, 3);
    this.cdref.detectChanges();

  }

  ngOnInit() {
    this.user = this.sharingService.fetch();

    this.category = this.budgetService.getCategory();
    this.budgets = this.budgetService.getBudgets();


    var waypoint = new Waypoint({
      element: document.getElementById('element-to-animate1'),
      handler: function(direction) {
        // console.log('Scrolled to waypoint!')
        $('#element-to-animate1').addClass('bounceIn');
   
      },
      offset: '50%'
    })

    var waypoint2 = new Waypoint({
      element: document.getElementById('element-to-animate2'),
      handler: function(direction) {
        // console.log('Scrolled to waypoint!')
        $('#element-to-animate2').addClass('bounceIn');
   
      },
      offset: '50%'
    })
  }

  getSpend() {
    this.spend = {
      Total: 0,
      Grocery: 0,
      Gas: 0,
      Others: 0
    };
    let accs = [];
    accs = this.accounts;
    accs.forEach(element => {

      element.transactions.forEach(e => {
        this.spend.Total = this.spend.Total + e[0];
        this.spend[e[3]] = this.spend[e[3]] + e[0];
      });
    });
    if (this.forChart.Total != this.spend.Total) {
      this.forChart.Total = this.spend.Total;
      this.forChart.Grocery = this.spend.Grocery;
      this.forChart.Gas = this.spend.Gas;
      this.forChart.Others = this.spend.Others;
      this.plotChart();
      $("#chartContainer").show();
    }
  }

  plotChart() {
    let chart = new CanvasJS.Chart("chartContainer", {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Monthly Total Expense"
      },
      data: [{
        type: "pie",
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
        indexLabel: "{name} - #percent%",
        dataPoints: [
          { y: this.forChart.Grocery, name: "Grocery" },
          { y: this.forChart.Gas, name: "Gas" },
          { y: this.forChart.Others, name: "Others" }
        ]
      }]
    });
    chart.render();
  }

  
}
