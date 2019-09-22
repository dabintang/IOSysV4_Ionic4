import { Component, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base/BasePage';

@Component({
  selector: 'app-basic-tab',
  templateUrl: './basic-tab.page.html',
  styleUrls: ['./basic-tab.page.scss'],
})
export class BasicTabPage extends BasePage implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }
}
