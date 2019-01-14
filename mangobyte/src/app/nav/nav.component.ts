import { Component, OnInit,AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { LoginService } from '../login/login.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{

  constructor(private cdr:ChangeDetectorRef, private LS:LoginService,private route:ActivatedRoute, private loc:Location) { }
  nav_elements=[
    ["Home", "/home"],
    ["About", "/about"],
    ["Interviews", "/courses/interviews"],
    ["Mentorship", "/mentors"],
    ["Courses", "/courses/details"],
    ["Blogs", ""],
    ["Contact", "/contact"],
  ]
  nav_selected='Home'
  sub_component=false;
  change_nav(nav){ 
    this.nav_selected=nav[0];
    window['$']('.navbar-toggler').click(); //bootstrap
    this.ngAfterViewInit();
    this.cdr.detectChanges();
    document.scrollingElement.scrollTop=0;
    console.log(nav, this.nav_selected);
    this.loc.go(nav[0]);
  }
  ngAfterViewInit(){
    
  }
  ngOnInit(){
    this.route.params.subscribe(params=>{
      var a=params['id']
      this.nav_selected=a=a[0].toUpperCase()+a.slice(1)
    })
  }

}
