import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveItemCartComponent } from './remove-item-cart.component';

describe('RemoveItemCartComponent', () => {
  let component: RemoveItemCartComponent;
  let fixture: ComponentFixture<RemoveItemCartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemoveItemCartComponent]
    });
    fixture = TestBed.createComponent(RemoveItemCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
