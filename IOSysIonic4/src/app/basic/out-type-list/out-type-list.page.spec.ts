import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutTypeListPage } from './out-type-list.page';

describe('OutTypeListPage', () => {
  let component: OutTypeListPage;
  let fixture: ComponentFixture<OutTypeListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutTypeListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutTypeListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
