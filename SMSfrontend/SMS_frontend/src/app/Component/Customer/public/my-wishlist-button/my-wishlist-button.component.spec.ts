import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyWishlistButtonComponent } from './my-wishlist-button.component';

describe('MyWishlistButtonComponent', () => {
  let component: MyWishlistButtonComponent;
  let fixture: ComponentFixture<MyWishlistButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyWishlistButtonComponent]
    });
    fixture = TestBed.createComponent(MyWishlistButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
