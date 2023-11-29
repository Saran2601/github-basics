import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressspinnerComponent } from './progressspinner.component';

describe('ProgressspinnerComponent', () => {
  let component: ProgressspinnerComponent;
  let fixture: ComponentFixture<ProgressspinnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgressspinnerComponent]
    });
    fixture = TestBed.createComponent(ProgressspinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
