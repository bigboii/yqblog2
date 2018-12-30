import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from '../../modules/home/home.component';
import { HeaderComponent } from '../../core/header/header.component';
import { SidenavComponent } from '../../core/sidenav/sidenav.component';
import { ContentComponent } from '../../modules/content/content.component';
import { ParallaxDirective } from '../../shared/directives/parallax.directive';
import { FasttextDirective } from '../../shared/directives/fasttext.directive';
import {OverlayContainer, OverlayModule} from '@angular/cdk/overlay';
import { FeatcardComponent } from '../../modules/content/featcard/featcard.component';
import { ContactComponent } from '../../modules/contact/contact.component';
import { AppRouterModule } from '../../shared/app-router.module';
import { AboutComponent } from '../../modules/about/about.component';
import { BlogComponent } from '../../modules/blog/blog.component';
import { ProjectsComponent } from '../../modules/projects/projects.component';
import { LazyloadDirective } from '../../shared/directives/lazyload.directive';
import { RevealonscrollDirective } from '../../shared/directives/revealonscroll.directive';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';
import { FooterComponent } from '../../core/footer/footer.component';  //needed to inject scrolling inside sidenav-content
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChatComponent } from '../../core/chat/chat.component';
import { AngularMaterialModule } from '../../shared/angular-material.module';

@NgModule({
  declarations: [
    HomeComponent,
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
    RevealonscrollDirective,
    FooterComponent,
    ChatComponent],
  imports: [
    CommonModule,
    OverlayModule,
    AppRouterModule,
    ScrollDispatchModule,
    FlexLayoutModule,
    AngularMaterialModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
