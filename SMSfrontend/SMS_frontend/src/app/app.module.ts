import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSortModule } from '@angular/material/sort';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Component/User/login/login.component';
import { SignupComponent } from './Component/User/signup/signup.component';
import { HomeComponent } from './Component/User/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule} from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';

import { MatDividerModule } from '@angular/material/divider';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { ApiServiceService } from './Component/Services/api-service.service';
import { CustomerdashboardComponent } from './Component/Customer/customer-dashboard/customerdashboard.component';
import { AdminDashboardComponent } from './Component/Admin/admin-dashboard/admin-dashboard.component';
import { AddItemComponent } from './Component/Admin/public/add-item/add-item.component';
import { ItemActionDeleteConfirmationComponent } from './Component/Admin/public/item-action-delete-confirmation/item-action-delete-confirmation.component';
import { ItemActionsComponent } from './Component/Admin/public/item-actions/item-actions.component';
import { ItemDeleteComponent } from './Component/Admin/public/item-delete/item-delete.component';
import { ItemDetailsFormComponent } from './Component/Admin/public/item-details-form/item-details-form.component';
import { ItemInsertComponent } from './Component/Admin/public/item-insert/item-insert.component';
import { ItemListComponent } from './Component/Admin/public/item-list/item-list.component';
import { ItemListSummaryComponent } from './Component/Admin/public/item-list-summary/item-list-summary.component';
import { ItemSellComponent } from './Component/Admin/public/item-sell/item-sell.component';
import { ItemUpdateComponent } from './Component/Admin/public/item-update/item-update.component';
import { ItemsComponent } from './Component/Admin/public/items/items.component';
import { MatTableModule } from '@angular/material/table';
import { NavbarComponent } from './Component/Admin/shared/navbar/navbar.component';
import { SidenavMenuItemsComponent } from './Component/Admin/shared/sidenav-menu-items/sidenav-menu-items.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { CurrencyPipe } from '@angular/common';
import { TopMenuComponent } from './Component/Customer/shared/top-menu/top-menu.component';
import { SearchComponent } from './Component/Customer/shared/search/search.component';

import { MyCartComponent } from './Component/Customer/public/my-cart/my-cart.component';
import { MyWishlistComponent } from './Component/Customer/public/my-wishlist/my-wishlist.component';
import { MobilesComponent } from './Component/Customer/public/mobiles/mobiles.component';
import { MyCartItemsComponent } from './Component/Customer/public/my-cart-items/my-cart-items.component';
import { RemoveItemCartComponent } from './Component/Customer/public/remove-item-cart/remove-item-cart.component';
import { MatSelectModule } from '@angular/material/select';
import { MyWishlistItemsComponent } from './Component/Customer/public/my-wishlist-items/my-wishlist-items.component';
import { LogoutComponent } from './Component/User/logout/logout.component';
import { AslComponent } from './Component/User/asl/asl.component';
import { ProgressspinnerComponent } from './Component/User/progressspinner/progressspinner.component';
import { ForgetpassworddialogComponent } from './Component/User/forgetpassworddialog/forgetpassworddialog.component';
import { ProfileComponent } from './Component/Customer/shared/profile/profile.component';
import { SideMenuComponent } from './Component/Customer/shared/side-menu/side-menu.component';
import { MyCartButtonComponent } from './Component/Customer/public/my-cart-button/my-cart-button.component';
import { MyWishlistButtonComponent } from './Component/Customer/public/my-wishlist-button/my-wishlist-button.component';
import { OrderButtonComponent } from './Component/Customer/public/order-button/order-button.component';
import { OrderFormComponent } from './Component/Customer/public/order-form/order-form.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MyOrdersButtonComponent } from './Component/Customer/public/my-orders-button/my-orders-button.component';
import { MyOrderItemsComponent } from './Component/Customer/public/my-order-items/my-order-items.component';
import { AddQuantityComponent } from './Component/Customer/public/add-quantity/add-quantity.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    CustomerdashboardComponent,
    AdminDashboardComponent,
    AddItemComponent,
    ItemActionDeleteConfirmationComponent,
    ItemActionsComponent,
    ItemDeleteComponent,
    ItemDetailsFormComponent,
    ItemInsertComponent,
    ItemListComponent,
    ItemListSummaryComponent,
    ItemSellComponent,
    ItemUpdateComponent,
    ItemsComponent,
    NavbarComponent,
    SidenavMenuItemsComponent,
    TopMenuComponent,
    SearchComponent,
    MyCartComponent,
    MyWishlistComponent,
    MobilesComponent,
    MyCartItemsComponent,
    RemoveItemCartComponent,
    MyWishlistItemsComponent,
    LogoutComponent,
    AslComponent,
    ProgressspinnerComponent,
    ForgetpassworddialogComponent,
    ProfileComponent,
    SideMenuComponent,
    MyCartButtonComponent,
    MyWishlistButtonComponent,
    OrderButtonComponent,
    OrderFormComponent,
    MyOrdersButtonComponent,
    MyOrderItemsComponent,
    AddQuantityComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatSortModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    CurrencyPipe,
    MatListModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    HttpClientModule,
    MatSelectModule,
    MatMenuModule,
    MatStepperModule,
    MatRadioModule,
    MatCheckboxModule,


  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: true, //keeps the user signed in
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('335646835807-6r5om3ee32va3pcksvcdeeaccg1a8qls.apps.googleusercontent.com') // your client id
        }
      ],
      // onerror:(err: any)=>{
      //   // console.error(err);
      // }
    } as SocialAuthServiceConfig
  },ApiServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
