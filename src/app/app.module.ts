import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material/angular-material.module'
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ContentComponent } from './content/content.component';
import { ToggleService } from './toggle.service';
import { ParallaxDirective } from './parallax.directive';
import { FasttextDirective } from './fasttext.directive';
import {OverlayContainer, OverlayModule} from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    ContentComponent,
    ParallaxDirective,
    FasttextDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    OverlayModule
  ],
  providers: [
    ToggleService   //make ToggleService a singleton (angular 5 way)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
