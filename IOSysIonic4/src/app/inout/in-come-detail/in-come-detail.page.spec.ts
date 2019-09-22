import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InComeDetailPage } from './in-come-detail.page';

describe('InComeDetailPage', () => {
  let component: InComeDetailPage;
  let fixture: ComponentFixture<InComeDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InComeDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InComeDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
