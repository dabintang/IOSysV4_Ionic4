import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InoutTabPage } from './inout-tab.page';

describe('InoutTabPage', () => {
  let component: InoutTabPage;
  let fixture: ComponentFixture<InoutTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InoutTabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InoutTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
