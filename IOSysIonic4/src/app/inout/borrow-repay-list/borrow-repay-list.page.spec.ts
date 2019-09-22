import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowRepayListPage } from './borrow-repay-list.page';

describe('BorrowRepayListPage', () => {
  let component: BorrowRepayListPage;
  let fixture: ComponentFixture<BorrowRepayListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrowRepayListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowRepayListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
