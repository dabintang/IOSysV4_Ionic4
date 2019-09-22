import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutTypeDetailPage } from './out-type-detail.page';

describe('OutTypeDetailPage', () => {
  let component: OutTypeDetailPage;
  let fixture: ComponentFixture<OutTypeDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutTypeDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutTypeDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
