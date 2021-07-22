import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCountDialogComponent } from './update-count-dialog.component';

describe('UpdateCountDialogComponent', () => {
  let component: UpdateCountDialogComponent;
  let fixture: ComponentFixture<UpdateCountDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateCountDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
