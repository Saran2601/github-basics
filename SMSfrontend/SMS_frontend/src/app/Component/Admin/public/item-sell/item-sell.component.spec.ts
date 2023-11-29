import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSellComponent } from './item-sell.component';

describe('ItemSellComponent', () => {
  let component: ItemSellComponent;
  let fixture: ComponentFixture<ItemSellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemSellComponent]
    });
    fixture = TestBed.createComponent(ItemSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
