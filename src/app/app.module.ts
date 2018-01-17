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
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LoginSignupButtonComponent } from './login-signup-button/login-signup-button.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { AddArtComponent } from './add-art/add-art.component';
import { ArtComponent } from './art/art.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { PictureAddedComponent } from './picture-added/picture-added.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { ManageArtworksComponent } from './manage-artworks/manage-artworks.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const appRoutes: Routes =
[
  {
    path: '',
    redirectTo: 'gallery',
    pathMatch: 'full'
  },
  {
    path: 'gallery',
    component: GalleryComponent
  },
  {
    path: 'gallery/:sorttype/:page',
    component: GalleryComponent
  },
  {
    path: 'gallery/:sorttype/:sortvar1/:sortvar2/:page',
    component: GalleryComponent
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
  },
  {
    path: 'admin-dashboard',
    canActivate: [AdminGuard],
    component: AdminDashboardComponent
  },
  {
    path: 'picture-added',
    canActivate: [AdminGuard],
    component: PictureAddedComponent
  },
  {
    path: 'add-category',
    canActivate: [AdminGuard],
    component: AddCategoryComponent
  },
  {
    path: 'manage-artworks',
    canActivate: [AdminGuard],
    component: ManageArtworksComponent
  },
  {
    path: 'manage-users',
    canActivate: [AdminGuard],
    component: ManageUsersComponent
  },
  {
    path: 'edit-user/:id',
    canActivate: [AdminGuard],
    component: EditUserComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    HomeComponent,
    GalleryComponent,
    LoginSignupButtonComponent,
    SignUpComponent,
    LoginComponent,
    AddArtComponent,
    ArtComponent,
    AdminDashboardComponent,
    PictureAddedComponent,
    AddCategoryComponent,
    ConfirmComponent,
    ManageArtworksComponent,
    ManageUsersComponent,
    EditUserComponent
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
