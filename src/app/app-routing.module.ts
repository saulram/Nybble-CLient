import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Screen1Component } from './screen1/screen1.component';


const routes: Routes = [
  {path:"",component:Screen1Component},
  {path:"RefreshComponent",component:Screen1Component},
  {path:"*",component:Screen1Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
