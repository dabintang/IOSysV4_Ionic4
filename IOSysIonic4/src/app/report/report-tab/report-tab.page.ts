import { Component, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base/BasePage';

@Component({
  selector: 'app-report-tab',
  templateUrl: './report-tab.page.html',
  styleUrls: ['./report-tab.page.scss'],
})
export class ReportTabPage extends BasePage implements OnInit {

  constructor() {
    super();
   }

  ngOnInit() {
  }

}
