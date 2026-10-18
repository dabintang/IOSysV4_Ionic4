import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearMonthSumListPage } from './year-month-sum-list.page';

describe('YearMonthSumListPage', () => {
  let component: YearMonthSumListPage;
  let fixture: ComponentFixture<YearMonthSumListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearMonthSumListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearMonthSumListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
