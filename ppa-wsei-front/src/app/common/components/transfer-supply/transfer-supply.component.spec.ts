import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferSupplyComponent } from './transfer-supply.component';

describe('TransferSupplyComponent', () => {
  let component: TransferSupplyComponent;
  let fixture: ComponentFixture<TransferSupplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferSupplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferSupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
