import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthOutSumListPage } from './month-out-sum-list.page';

describe('MonthOutSumListPage', () => {
  let component: MonthOutSumListPage;
  let fixture: ComponentFixture<MonthOutSumListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthOutSumListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthOutSumListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
