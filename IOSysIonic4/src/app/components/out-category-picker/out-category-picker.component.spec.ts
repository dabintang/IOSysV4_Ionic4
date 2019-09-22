import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutCategoryPickerPage } from './out-category-picker.page';

describe('OutCategoryPickerPage', () => {
  let component: OutCategoryPickerPage;
  let fixture: ComponentFixture<OutCategoryPickerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutCategoryPickerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutCategoryPickerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
