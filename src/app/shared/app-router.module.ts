import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContentComponent } from '../modules/content/content.component';
import { AboutComponent } from '../modules/about/about.component';
import { ProjectsComponent } from '../modules/projects/projects.component';
import { BlogComponent } from '../modules/blog/blog.component';

const routes: Routes = [
  { path: '', redirectTo: 'content', pathMatch: 'full' },
  { path: 'content', component: ContentComponent, data:{page: "content"}},
  { path: 'about', component: AboutComponent, data:{page: "about"} },
  { path: 'projects', component: ProjectsComponent, data:{page: "projects"}},
  { path: 'blog', component: BlogComponent, data:{page: "blog"}}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [ RouterModule ]
})
export class AppRouterModule { }
