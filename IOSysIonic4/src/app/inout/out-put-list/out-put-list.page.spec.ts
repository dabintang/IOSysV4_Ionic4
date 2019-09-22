import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutPutListPage } from './out-put-list.page';

describe('OutPutListPage', () => {
  let component: OutPutListPage;
  let fixture: ComponentFixture<OutPutListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutPutListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutPutListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
