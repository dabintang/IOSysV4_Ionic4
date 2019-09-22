import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountTurnoverListPage } from './account-turnover-list.page';

describe('AccountTurnoverListPage', () => {
  let component: AccountTurnoverListPage;
  let fixture: ComponentFixture<AccountTurnoverListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountTurnoverListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountTurnoverListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
