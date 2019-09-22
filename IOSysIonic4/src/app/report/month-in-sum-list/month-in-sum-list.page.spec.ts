import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthInSumListPage } from './month-in-sum-list.page';

describe('MonthInSumListPage', () => {
  let component: MonthInSumListPage;
  let fixture: ComponentFixture<MonthInSumListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthInSumListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthInSumListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
