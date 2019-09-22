import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowRepayDetailPage } from './borrow-repay-detail.page';

describe('BorrowRepayDetailPage', () => {
  let component: BorrowRepayDetailPage;
  let fixture: ComponentFixture<BorrowRepayDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrowRepayDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowRepayDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
