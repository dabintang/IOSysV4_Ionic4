import { Component, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base/BasePage';

@Component({
  selector: 'app-inout-tab',
  templateUrl: './inout-tab.page.html',
  styleUrls: ['./inout-tab.page.scss'],
})
export class InoutTabPage extends BasePage implements OnInit  {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
