import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearInOutSumListPage } from './year-in-out-sum-list.page';

describe('YearInOutSumListPage', () => {
  let component: YearInOutSumListPage;
  let fixture: ComponentFixture<YearInOutSumListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearInOutSumListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearInOutSumListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
