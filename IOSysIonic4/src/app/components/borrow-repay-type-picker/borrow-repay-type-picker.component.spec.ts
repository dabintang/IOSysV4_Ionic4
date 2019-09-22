import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowRepayTypePickerPage } from './borrow-repay-type-picker.page';

describe('BorrowRepayTypePickerPage', () => {
  let component: BorrowRepayTypePickerPage;
  let fixture: ComponentFixture<BorrowRepayTypePickerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrowRepayTypePickerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowRepayTypePickerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
