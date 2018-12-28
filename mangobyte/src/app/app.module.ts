import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CoursesComponent } from './courses/courses.component';
import { EntreprComponent } from './courses/components/entrepr/entrepr.component';
import { AcadComponent } from './courses/components/acad/acad.component';
import { PublicComponent } from './courses/components/public/public.component';
import { CorporateComponent } from './courses/components/corporate/corporate.component';
import { PoliticsComponent } from './courses/components/politics/politics.component';
import { MentorsComponent } from './mentors/mentors.component';
import { ContactComponent } from './contact/contact.component';
import { DetailsComponent } from './courses/components/details/details.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { BlogdetailsComponent } from './courses/components/blogdetails/blogdetails.component';
import { BlogComponent } from './blog/blog.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'mentors', component: MentorsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'courses', component: CoursesComponent,
    children: [
      {path: 'details', component:DetailsComponent},
      {path: 'entrepreneurship', component:EntreprComponent},
      {path: 'academia', component:AcadComponent},
      {path: 'public', component:PublicComponent},
      {path: 'corporate', component:CorporateComponent},
      {path: 'politics', component:PoliticsComponent},
      {path: 'blogdetails', component:BlogdetailsComponent},
      { path: '',
        redirectTo: '/courses/details',
        pathMatch: 'full'
      },
    ]
  },      
  {path:'', redirectTo:'/home', pathMatch:'full' }
  
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    CoursesComponent,
    EntreprComponent,
    AcadComponent,
    PublicComponent,
    CorporateComponent,
    PoliticsComponent,
    MentorsComponent,
    ContactComponent,
    DetailsComponent,
    NavComponent,
    FooterComponent,
    LoginComponent,
    BlogdetailsComponent,
    BlogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes, {enableTracing:false}),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
