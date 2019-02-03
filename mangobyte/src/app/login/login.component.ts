import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private ls:LoginService, private cdr:ChangeDetectorRef) {
    ls.addChild(this);
  }
  ngOnInit() {
  }
  ngAfterViewInit(){
    var self=this;
    
  }
  hidelogin(){
    document.getElementById("logindiv").style.display="none";
    console.log("login hidden");
  }
  showlogin(){
    document.getElementById("logindiv").style.display="block";
    console.log("login shown");
  }
  refresh(){
    this.cdr.detectChanges();
  }
  login(){
    var self=this;
    this.ls.up_login(
      document.getElementById("loginformuser")['value'], 
      document.getElementById("loginformpass")['value'],
      
      )
  }
  logout(){
    var self=this;
    this.ls.logout();
  }
}
