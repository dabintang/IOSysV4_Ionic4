import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthSumListPage } from './month-sum-list.page';

describe('MonthSumListPage', () => {
  let component: MonthSumListPage;
  let fixture: ComponentFixture<MonthSumListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthSumListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthSumListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
