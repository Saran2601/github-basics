import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCartButtonComponent } from './my-cart-button.component';

describe('MyCartButtonComponent', () => {
  let component: MyCartButtonComponent;
  let fixture: ComponentFixture<MyCartButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyCartButtonComponent]
    });
    fixture = TestBed.createComponent(MyCartButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
