import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IonTdbPickerMulti2Component } from './ion-tdb-picker-multi2.component';

describe('IonTdbPickerMulti2Component', () => {
  let component: IonTdbPickerMulti2Component;
  let fixture: ComponentFixture<IonTdbPickerMulti2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IonTdbPickerMulti2Component ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IonTdbPickerMulti2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
