import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOrderItemsComponent } from './my-order-items.component';

describe('MyOrderItemsComponent', () => {
  let component: MyOrderItemsComponent;
  let fixture: ComponentFixture<MyOrderItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyOrderItemsComponent]
    });
    fixture = TestBed.createComponent(MyOrderItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
