import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './modules/angular-material.module'
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ContentComponent } from './content/content.component';
import { ToggleService } from './services/toggle.service';
import { ParallaxDirective } from './directives/parallax.directive';
import { FasttextDirective } from './directives/fasttext.directive';
import {OverlayContainer, OverlayModule} from '@angular/cdk/overlay';
import { FeatcardComponent } from './content/featcard/featcard.component';
import { ContactComponent } from './contact/contact.component';
import { AppRouterModule } from './modules/app-router.module';
import { AboutComponent } from './about/about.component';
import { BlogComponent } from './blog/blog.component';
import { ProjectsComponent } from './projects/projects.component';
import { LazyloadDirective } from './directives/lazyload.directive';
import { RevealonscrollDirective } from './directives/revealonscroll.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    ContentComponent,
    ParallaxDirective,
    FasttextDirective,
    FeatcardComponent,
    ContactComponent,
    AboutComponent,
    BlogComponent,
    ProjectsComponent,
    LazyloadDirective,
    RevealonscrollDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    OverlayModule,
    AppRouterModule
  ],
  providers: [
    ToggleService   //make ToggleService a singleton (angular 5 way)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
