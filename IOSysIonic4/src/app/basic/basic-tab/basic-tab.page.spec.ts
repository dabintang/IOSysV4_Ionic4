import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicTabPage } from './basic-tab.page';

describe('BasicTabPage', () => {
  let component: BasicTabPage;
  let fixture: ComponentFixture<BasicTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicTabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
