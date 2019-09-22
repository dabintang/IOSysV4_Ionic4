import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InTypeListPage } from './in-type-list.page';

describe('InTypeListPage', () => {
  let component: InTypeListPage;
  let fixture: ComponentFixture<InTypeListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InTypeListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InTypeListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
