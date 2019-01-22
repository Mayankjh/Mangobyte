import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './nav/home/home.component';
import { AboutComponent } from './nav/about/about.component';
import { CoursesComponent } from './courses/courses.component';
import { EntreprComponent } from './courses/components/entrepr/entrepr.component';
import { AcadComponent } from './courses/components/acad/acad.component';
import { PublicComponent } from './courses/components/public/public.component';
import { CorporateComponent } from './courses/components/corporate/corporate.component';
import { PoliticsComponent } from './courses/components/politics/politics.component';
import { MentorsComponent } from './nav/mentors/mentors.component';
import { ContactComponent } from './nav/contact/contact.component';
import { DetailsComponent } from './nav/details/details.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { BlogdetailsComponent } from './courses/components/blogdetails/blogdetails.component';
import { BlogComponent } from './blog/blog.component';
import {BlogcategoryComponent} from './blog/create/blogcategory/blogcategory.component';
import { InterviewsComponent } from './nav/interviews/interviews.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IntervComponent } from './dashboard/components/interv/interv.component';
import { CourComponent } from './dashboard/components/cour/cour.component';
import { CreateComponent } from './blog/create/create.component';
import { PreviewdisplayerComponent } from './nav/previewdisplayer/previewdisplayer.component';
import { EditbcComponent } from './nav/previewdisplayer/editbc/editbc.component';
import { CommentComponent } from './courses/components/blogdetails/comment/comment.component';
import {AccountComponent} from './account/account.component'

const appRoutes: Routes = [
  
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
    BlogComponent,
    InterviewsComponent,
    DashboardComponent,
    IntervComponent,
    CourComponent,
    CreateComponent,
    BlogcategoryComponent,
    PreviewdisplayerComponent,
    EditbcComponent,
    CommentComponent,
    AccountComponent
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
