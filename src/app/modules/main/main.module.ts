import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OverlayContainer, OverlayModule} from '@angular/cdk/overlay';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { ProjectsComponent } from './pages/projects/projects.component';

import { HeaderComponent } from '../../core/header/header.component';
import { SidenavComponent } from '../../core/sidenav/sidenav.component';
import { FooterComponent } from '../../core/footer/footer.component';  //needed to inject scrolling inside sidenav-content

import { ParallaxDirective } from '../../shared/directives/parallax.directive';
import { FasttextDirective } from '../../shared/directives/fasttext.directive';
import { LazyloadDirective } from '../../shared/directives/lazyload.directive';
import { RevealonscrollDirective } from '../../shared/directives/revealonscroll.directive';
import { AngularMaterialModule } from '../../shared/angular-material.module';

import { FeatcardComponent } from './components/featcard/featcard.component';
import { AppRouterModule } from './app-router.module';
import { MainComponent } from './main.component'

import { ChatModule } from '../chat/chat.module'

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    HeaderComponent,
    SidenavComponent,
    ParallaxDirective,
    FasttextDirective,
    FeatcardComponent,
    ContactComponent,
    AboutComponent,
    ProjectsComponent,
    LazyloadDirective,
    RevealonscrollDirective,
    FooterComponent],
  imports: [
    CommonModule,
    OverlayModule,
    AppRouterModule,
    ScrollDispatchModule,
    FlexLayoutModule,
    AngularMaterialModule,
    ChatModule
  ],
  exports: [
    MainComponent
  ]
})
export class MainModule { }
