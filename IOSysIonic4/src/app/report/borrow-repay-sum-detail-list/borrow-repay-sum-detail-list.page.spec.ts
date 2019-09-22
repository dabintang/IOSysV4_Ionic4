import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowRepaySumDetailListPage } from './borrow-repay-sum-detail-list.page';

describe('BorrowRepaySumDetailListPage', () => {
  let component: BorrowRepaySumDetailListPage;
  let fixture: ComponentFixture<BorrowRepaySumDetailListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrowRepaySumDetailListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowRepaySumDetailListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
