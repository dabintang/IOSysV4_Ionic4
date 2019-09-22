import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IonTdbPickerSinglePage } from './ion-tdb-picker-single.page';

describe('IonTdbPickerSinglePage', () => {
  let component: IonTdbPickerSinglePage;
  let fixture: ComponentFixture<IonTdbPickerSinglePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IonTdbPickerSinglePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IonTdbPickerSinglePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
