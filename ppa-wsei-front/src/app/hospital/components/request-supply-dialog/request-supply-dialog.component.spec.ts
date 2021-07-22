import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestSupplyDialogComponent } from './request-supply-dialog.component';

describe('AcceptSupplyDialogComponent', () => {
  let component: RequestSupplyDialogComponent;
  let fixture: ComponentFixture<RequestSupplyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestSupplyDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestSupplyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
