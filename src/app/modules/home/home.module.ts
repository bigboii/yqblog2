import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OverlayContainer, OverlayModule} from '@angular/cdk/overlay';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HomeComponent } from './home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { ProjectsComponent } from './pages/projects/projects.component';

import { ParallaxDirective } from '../../shared/directives/parallax.directive';
import { FastTextDirective } from '../../shared/directives/fasttext.directive';
import { LazyloadDirective } from '../../shared/directives/lazyload.directive';
import { RevealonscrollDirective } from '../../shared/directives/revealonscroll.directive';
import { ScrollRevealDirective } from '../../shared/directives/scrollreveal.directive';
import { AngularMaterialModule } from '../../shared/angular-material.module';
import { ElevateOnHoverDirective } from '../../shared/directives/elevateonhover.directive'

import { VerticalTabsComponent } from './vertical-tabs/vertical-tabs.component';

import { ChatModule } from '../chat/chat.module';
import { MLClientModule} from '../ml-client/ml-client.module'
import { ParallaxHomeComponent } from './parallax-home.component'

// import { HeaderComponent } from '../../core/header/header.component';

import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop'

@NgModule({
  declarations: [
    HomeComponent,
    ParallaxDirective,
    FastTextDirective,
    VerticalTabsComponent,
    ContactComponent,
    AboutComponent,
    ProjectsComponent,
    LazyloadDirective,
    RevealonscrollDirective,
    ScrollRevealDirective,
    ParallaxHomeComponent,
    ElevateOnHoverDirective
  ],
  imports: [
    BrowserModule,
    CommonModule,
    OverlayModule,
    ScrollDispatchModule,
    FlexLayoutModule,
    AngularMaterialModule,
    ChatModule,
    MLClientModule,
    DragDropModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
