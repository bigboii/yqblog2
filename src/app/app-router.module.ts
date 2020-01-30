import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './modules/home/home.component';
import { AboutComponent } from './modules/home/pages/about/about.component';
import { ProjectsComponent } from './modules/home/pages/projects/projects.component';
import { ChatComponent } from './modules/chat/chat.component';

import { ParallaxHomeComponent } from './modules/home/parallax-home.component'
import { MLClientComponent } from './modules/ml-client/ml-client.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data:{page: "home"}},
//  { path: 'home', component: ParallaxHomeComponent, outlet:'parallax', data:{page: "home"}},
  { path: 'about', component: AboutComponent, data:{page: "about"} },
  { path: 'projects', component: ProjectsComponent, data:{page: "projects"}},
  { path: 'chat', component: ChatComponent, data:{page: "chat"}},
  { path: 'ml', component: MLClientComponent, data:{page:"ml"}},
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [ RouterModule ]
})
export class AppRouterModule { }
