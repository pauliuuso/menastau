import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AdminGuard } from './guards/admin.guard';
import { ArtistGuard } from './guards/artist.guard';

import { UserService } from './user.service';
import { ValidatorService } from './validator.service';
import { SharedService } from './shared.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';
import { MenuComponent } from './menu/menu.component';
import { ItemDashboardComponent } from './item-dashboard/item-dashboard.component';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LoginSignupButtonComponent } from './login-signup-button/login-signup-button.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { AddArtComponent } from './add-art/add-art.component';

const appRoutes: Routes =
[
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'shop/:type',
    component: ShopComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'add-art',
    canActivate: [AdminGuard],
    component: AddArtComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    MenuComponent,
    ItemDashboardComponent,
    HomeComponent,
    ShopComponent,
    LoginSignupButtonComponent,
    SignUpComponent,
    LoginComponent,
    AddArtComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    UserService,
    ValidatorService,
    SharedService,
    AdminGuard,
    ArtistGuard,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
