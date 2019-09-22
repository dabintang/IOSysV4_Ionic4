import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountTurnoverFilterPage } from './account-turnover-filter.page';

describe('AccountTurnoverFilterPage', () => {
  let component: AccountTurnoverFilterPage;
  let fixture: ComponentFixture<AccountTurnoverFilterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountTurnoverFilterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountTurnoverFilterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
