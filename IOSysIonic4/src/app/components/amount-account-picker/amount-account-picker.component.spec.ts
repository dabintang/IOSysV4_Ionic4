import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountAccountPickerPage } from './amount-account-picker.page';

describe('AmountAccountPickerPage', () => {
  let component: AmountAccountPickerPage;
  let fixture: ComponentFixture<AmountAccountPickerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmountAccountPickerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmountAccountPickerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
