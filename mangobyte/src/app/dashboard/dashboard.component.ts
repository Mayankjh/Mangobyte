import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private ls:LoginService, private cdr:ChangeDetectorRef) { }
  nav_list=[
    ["Home", "home"],
    ["Interviews", "chalkboard-teacher"],
    ["Courses", "user-graduate"],
    ["Logout", "power-off"]  
  ]
  nav_selected=this.nav_list[0][0]
  updatenav(nav){
    this.nav_selected=nav[0];
    this.cdr.detectChanges();
    //console.log(this.nav_selected, nav);
  }
  ngOnInit() {
    console.log()
  }

}
