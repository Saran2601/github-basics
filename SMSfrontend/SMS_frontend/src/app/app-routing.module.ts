import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/User/home/home.component';
import { SignupComponent } from './Component/User/signup/signup.component';
import { LoginComponent } from './Component/User/login/login.component';
import { AdminDashboardComponent } from './Component/Admin/admin-dashboard/admin-dashboard.component';
import { AddItemComponent } from './Component/Admin/public/add-item/add-item.component';
import { ItemsComponent } from './Component/Admin/public/items/items.component';
import { MyWishlistItemsComponent } from './Component/Customer/public/my-wishlist-items/my-wishlist-items.component';
import { TopMenuComponent } from './Component/Customer/shared/top-menu/top-menu.component';
import { ItemListSummaryComponent } from './Component/Admin/public/item-list-summary/item-list-summary.component';
import { MobilesComponent } from './Component/Customer/public/mobiles/mobiles.component';
import { MyCartItemsComponent } from './Component/Customer/public/my-cart-items/my-cart-items.component';
import { OrderFormComponent } from './Component/Customer/public/order-form/order-form.component';
import { MyOrderItemsComponent } from './Component/Customer/public/my-order-items/my-order-items.component';
import { AuthGuard } from './Component/Services/auth-guard.service';
import { CanDeactivateGuard } from './Component/Customer/services/can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'user/signup', component: SignupComponent },
      { path: 'user/login', component: LoginComponent }
    ]
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'items/add', component: AddItemComponent },
      { path: 'items', component: ItemsComponent },
      { path: 'items/summary', component: ItemListSummaryComponent }
    ]
  },
  {
    path: 'dashboard',
    component: TopMenuComponent,
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard],
    children: [
      { path: 'mobiles', component: MobilesComponent },
      { path: 'my-cart-items', component: MyCartItemsComponent },
      { path: 'my-wishlist-items', component: MyWishlistItemsComponent },
      { path: 'checkout', component: OrderFormComponent },
      { path: 'my-order-items', component: MyOrderItemsComponent },


    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
