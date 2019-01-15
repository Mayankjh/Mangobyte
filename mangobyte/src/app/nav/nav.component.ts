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
    this.show_blog=false;
    this.nav_selected=nav[0];
    window['$']('.navbar-toggler').click(); //bootstrap
    this.ngAfterViewInit();
    this.cdr.detectChanges();
    document.scrollingElement.scrollTop=0;
    console.log(nav, this.nav_selected);
    this.loc.go(nav[0]);
    console.log(this.nav_selected, this.show_blog);
  }
  ngAfterViewInit(){
    
  }
  show_blog=false;
  ngOnInit(){
    this.route.params.subscribe(params=>{
      var a=params['id']
      if(Object.is(Number(a), NaN)){
        this.nav_selected=a[0].toUpperCase()+a.slice(1);
        this.show_blog=false;
        console.log("Was i here?")
        } else {
          this.show_blog=true;
          this.nav_selected=a;
          console.log("I ws here", a, Number(a)) 
      }
      //console.log(this.nav_selected, this.show_blog, Number(a))*/
      this.nav_selected=a[0].toUpperCase()+a.slice(1);
      console.log(this.nav_selected, this.show_blog);

    })
  }

}
