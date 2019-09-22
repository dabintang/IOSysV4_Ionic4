import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InTypePickerPage } from './in-type-picker.page';

describe('InTypePickerPage', () => {
  let component: InTypePickerPage;
  let fixture: ComponentFixture<InTypePickerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InTypePickerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InTypePickerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
