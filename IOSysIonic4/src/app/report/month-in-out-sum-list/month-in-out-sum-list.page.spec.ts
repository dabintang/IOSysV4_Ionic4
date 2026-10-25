import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthInOutSumListPage } from './month-in-out-sum-list.page';

describe('MonthInOutSumListPage', () => {
  let component: MonthInOutSumListPage;
  let fixture: ComponentFixture<MonthInOutSumListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthInOutSumListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthInOutSumListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
