import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InTypeDetailPage } from './in-type-detail.page';

describe('InTypeDetailPage', () => {
  let component: InTypeDetailPage;
  let fixture: ComponentFixture<InTypeDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InTypeDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InTypeDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
