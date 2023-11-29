import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailsFormComponent } from './item-details-form.component';

describe('ItemDetailsFormComponent', () => {
  let component: ItemDetailsFormComponent;
  let fixture: ComponentFixture<ItemDetailsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemDetailsFormComponent]
    });
    fixture = TestBed.createComponent(ItemDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
