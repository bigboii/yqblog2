import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AngularMaterialModule } from './shared/angular-material.module'
import { MainModule } from './modules/main/main.module'

import { HeaderComponent } from './core/header/header.component';
import { SidenavComponent } from './core/sidenav/sidenav.component';
import { MainComponent } from './modules/main/main.component';
import { MainRouterModule } from './modules/main/main-router.module';
//import { FooterComponent } from './core/footer/footer.component';  //needed to inject scrolling inside sidenav-content


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
//    FooterComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MainRouterModule,
    AngularMaterialModule,
    MainModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
