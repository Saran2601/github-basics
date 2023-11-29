import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyWishlistItemsComponent } from './my-wishlist-items.component';

describe('MyWishlistItemsComponent', () => {
  let component: MyWishlistItemsComponent;
  let fixture: ComponentFixture<MyWishlistItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyWishlistItemsComponent]
    });
    fixture = TestBed.createComponent(MyWishlistItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
