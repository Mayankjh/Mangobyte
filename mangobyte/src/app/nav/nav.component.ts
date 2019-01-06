import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private cdr:ChangeDetectorRef) { }
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
    this.cdr.detectChanges();
  }
  ngOnInit() {
  }

}
