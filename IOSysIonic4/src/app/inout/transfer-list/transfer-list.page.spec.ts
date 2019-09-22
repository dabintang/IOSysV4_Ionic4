import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferListPage } from './transfer-list.page';

describe('TransferListPage', () => {
  let component: TransferListPage;
  let fixture: ComponentFixture<TransferListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
