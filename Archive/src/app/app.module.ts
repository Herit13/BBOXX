import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserListModule } from './user/user.module';
import { UserComponent } from './user/user.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    UserListModule
  ],
  providers: [],
  bootstrap: [UserComponent]
})
export class AppModule { }
