import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogdetailsComponent } from './courses/components/blogdetails/blogdetails.component';
import { NavComponent } from './nav/nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path:'blog/:id', component:BlogdetailsComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'', redirectTo:'about', pathMatch:'full'},
  {path:':id', component:NavComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
