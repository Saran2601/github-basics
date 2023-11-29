import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavMenuItemsComponent } from './sidenav-menu-items.component';

describe('SidenavMenuItemsComponent', () => {
  let component: SidenavMenuItemsComponent;
  let fixture: ComponentFixture<SidenavMenuItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidenavMenuItemsComponent]
    });
    fixture = TestBed.createComponent(SidenavMenuItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
