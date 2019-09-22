import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferDetailPage } from './transfer-detail.page';

describe('TransferDetailPage', () => {
  let component: TransferDetailPage;
  let fixture: ComponentFixture<TransferDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
