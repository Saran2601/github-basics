import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetpassworddialogComponent } from './forgetpassworddialog.component';

describe('ForgetpassworddialogComponent', () => {
  let component: ForgetpassworddialogComponent;
  let fixture: ComponentFixture<ForgetpassworddialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgetpassworddialogComponent]
    });
    fixture = TestBed.createComponent(ForgetpassworddialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
