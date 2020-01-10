import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/content/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ChatComponent } from '../chat/chat.component';

import { ParallaxHomeComponent } from './pages/home/parallax/parallax-home.component'
import { MLClientComponent } from '../ml-client/ml-client.component';

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
export class MainRouterModule { }
