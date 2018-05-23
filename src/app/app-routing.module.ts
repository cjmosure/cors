import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {HttpHeadersComponent} from './http-headers/http-headers.component';
import {FaqComponent} from './faq/faq.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'http-headers',
    pathMatch: 'full',
    component: HttpHeadersComponent
  },
  {
    path: 'faq',
    pathMatch: 'full',
    component: FaqComponent
  },
  {
    path: 'request',
    pathMatch: 'full',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
