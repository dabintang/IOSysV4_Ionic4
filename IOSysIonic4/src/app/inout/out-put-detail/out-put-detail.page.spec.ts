import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutPutDetailPage } from './out-put-detail.page';

describe('OutPutDetailPage', () => {
  let component: OutPutDetailPage;
  let fixture: ComponentFixture<OutPutDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutPutDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutPutDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
