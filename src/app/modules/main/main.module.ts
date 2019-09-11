import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OverlayContainer, OverlayModule} from '@angular/cdk/overlay';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HomeComponent } from './pages/home/content/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { ProjectsComponent } from './pages/projects/projects.component';

import { FooterComponent } from '../../core/footer/footer.component';  //needed to inject scrolling inside sidenav-content

import { ParallaxDirective } from '../../shared/directives/parallax.directive';
import { FasttextDirective } from '../../shared/directives/fasttext.directive';
import { LazyloadDirective } from '../../shared/directives/lazyload.directive';
import { RevealonscrollDirective } from '../../shared/directives/revealonscroll.directive';
import { ScrollRevealDirective } from '../../shared/directives/scrollreveal.directive';
import { AngularMaterialModule } from '../../shared/angular-material.module';
import { ElevateOnHoverDirective } from '../../shared/directives/elevateonhover.directive';

import { FeatcardComponent } from './components/featcard/featcard.component';
import { MainRouterModule } from './main-router.module';
import { MainComponent } from './main.component'

import { ChatModule } from '../chat/chat.module';
import { ParallaxHomeComponent } from './pages/home/parallax/parallax-home.component'

import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop'

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    ParallaxDirective,
    FasttextDirective,
    FeatcardComponent,
    ContactComponent,
    AboutComponent,
    ProjectsComponent,
    LazyloadDirective,
    RevealonscrollDirective,
    ScrollRevealDirective,
    FooterComponent,
    ParallaxHomeComponent],
  imports: [
    BrowserModule,
    MainRouterModule,
    CommonModule,
    OverlayModule,
    ScrollDispatchModule,
    FlexLayoutModule,
    AngularMaterialModule,
    ChatModule,
    DragDropModule
  ],
  exports: [
    MainComponent
  ]
})
export class MainModule { }
