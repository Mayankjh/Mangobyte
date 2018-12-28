import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private ls:LoginService, private cdr:ChangeDetectorRef) {
    var self=this;
    ls.child=self;
  }
  ngOnInit() {
  }
  ngAfterViewInit(){
    var self=this;
    
  }
  refresh(){
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
