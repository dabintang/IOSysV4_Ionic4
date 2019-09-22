import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InComeListPage } from './in-come-list.page';

describe('InComeListPage', () => {
  let component: InComeListPage;
  let fixture: ComponentFixture<InComeListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InComeListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InComeListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
