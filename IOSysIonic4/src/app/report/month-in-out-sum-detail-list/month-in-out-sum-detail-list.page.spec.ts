import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthInOutSumDetailListPage } from './month-in-out-sum-detail-list.page';

describe('MonthInOutSumDetailListPage', () => {
  let component: MonthInOutSumDetailListPage;
  let fixture: ComponentFixture<MonthInOutSumDetailListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthInOutSumDetailListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthInOutSumDetailListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
