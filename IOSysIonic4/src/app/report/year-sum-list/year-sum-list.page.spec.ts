import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearSumListPage } from './year-sum-list.page';

describe('YearSumListPage', () => {
  let component: YearSumListPage;
  let fixture: ComponentFixture<YearSumListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearSumListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearSumListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
