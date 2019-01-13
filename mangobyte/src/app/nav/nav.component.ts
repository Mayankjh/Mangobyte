import { Component, OnInit,AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  constructor(private cdr:ChangeDetectorRef, private LS:LoginService) { }
  nav_elements=[
    ["Home", "/home"],
    ["About", "/about"],
    ["Interviews", "/courses/interviews"],
    ["Mentorship", "/mentors"],
    ["Courses", "/courses/details"],
    ["Contact", "/contact"]
  ]
  nav_selected='Home'
  sub_component=false;
  change_nav(nav){ 
    this.nav_selected=nav[0];
    window['$']('.navbar-toggler').click(); //bootstrap
    this.ngAfterViewInit();
    this.cdr.detectChanges();
  }
  ngAfterViewInit() {
    if(this.nav_selected=="Interviews"){
      document.getElementById("banner_big").innerText="Interviews";
      document.getElementById("banner_small").innerText="";
    } else if(this.nav_selected=="Courses"){
      document.getElementById("banner_big").innerText="Courses";
      document.getElementById("banner_small").innerText="";
    }
  }

}
