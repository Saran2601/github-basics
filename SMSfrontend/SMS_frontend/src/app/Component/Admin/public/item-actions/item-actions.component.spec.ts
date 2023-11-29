import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemActionsComponent } from './item-actions.component';

describe('ItemActionsComponent', () => {
  let component: ItemActionsComponent;
  let fixture: ComponentFixture<ItemActionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemActionsComponent]
    });
    fixture = TestBed.createComponent(ItemActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
