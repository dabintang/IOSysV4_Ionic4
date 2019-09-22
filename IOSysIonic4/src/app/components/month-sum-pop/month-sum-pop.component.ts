import { Component, OnInit } from '@angular/core';
import { MonthSumPop } from 'src/model/report/MonthSumPop';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-month-sum-pop',
  templateUrl: './month-sum-pop.component.html',
  styleUrls: ['./month-sum-pop.component.scss'],
})
//收支统计页面弹框
export class MonthSumPopComponent implements OnInit {

  //弹框筛选条件
  req: MonthSumPop = new MonthSumPop();

  constructor(
    private navParams: NavParams
  ) { }

  ngOnInit() {
    //入参
    this.req = this.navParams.get('reqPop') as MonthSumPop;
  }
}
