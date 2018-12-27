import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public logindetails:any={
    'loginstatus':false,
    'id':-1
  };
  constructor(private ls:LoginService, private cdr:ChangeDetectorRef) {
    var self=this;
    this.ls.refreshfunctions.push(
      ()=>{
        self.logindetails=self.ls.logdetails;
        console.log(self.logindetails);
        self.cdr.detectChanges();
      }
    ); 
  }
  ngOnInit() {
  }
  refresh(){
    this.logindetails=this.ls.logdetails;
    console.log(this.logindetails);
    this.cdr.detectChanges();
  }
  login(){
    var self=this;
    this.ls.login(
      document.getElementById("loginformuser")['value'], 
      document.getElementById("loginformpass")['value'],
      
      )
  }
  logout(){
    var self=this;
    this.ls.logout((data)=>{
      self.refresh();
    });
  }
}
