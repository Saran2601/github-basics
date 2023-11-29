import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOrdersButtonComponent } from './my-orders-button.component';

describe('MyOrdersButtonComponent', () => {
  let component: MyOrdersButtonComponent;
  let fixture: ComponentFixture<MyOrdersButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyOrdersButtonComponent]
    });
    fixture = TestBed.createComponent(MyOrdersButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
