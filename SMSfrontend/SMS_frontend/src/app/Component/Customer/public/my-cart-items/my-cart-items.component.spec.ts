import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCartItemsComponent } from './my-cart-items.component';

describe('MyCartItemsComponent', () => {
  let component: MyCartItemsComponent;
  let fixture: ComponentFixture<MyCartItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyCartItemsComponent]
    });
    fixture = TestBed.createComponent(MyCartItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
