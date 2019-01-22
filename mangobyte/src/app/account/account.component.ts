import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AccountService } from './account.service';
//import { AccountService } from '../about/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  @Input() show: any;
  
  constructor(private cdr:ChangeDetectorRef, private AC:AccountService) { 
    //AC.addChild(this);  
  }
  googleUser = {};

  startApp
  ngOnInit() {
    var self = this;
    this.startApp = function () {
      window['gapi'].load('auth2', function () {
        window['auth2'] = window['gapi'].auth2.init({
          client_id: '716951121838-plvdimng1engvdjog7fp8hlg8g8th6c2.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        self.attachSignin(document.getElementById('google_login_btn'), self);
      
      
        window['auth2'].isSignedIn.listen((val)=>{self.signinChanged(val,self)});
      window['auth2'].currentUser.listen(val=>self.userChanged(val, self));
      if(window['auth2'].isSignedIn.get()==true){
        // 
        console.log(window['auth2'].currentUser.get())
        self.AC.user=window['auth2'].currentUser.get();
        self.AC.islogged=true;
      } else {
        self.AC.user=null;
        self.AC.islogged=false;
      }

      });


    };
  }
  signinChanged(val, self){
    //console.log("sign in state changed to", val, self);
    // check the server for the user details, if token valid, hurray, continue
    if(!val){  
    self.AC.user=null;
      self.AC.islogged=false;
    }
    this.refresh();
    // else provide the id_token to signin again
  }
  userChanged(val, self){
    if(!val.isSignedIn()) {
      self.AC.user=null;
      self.AC.islogged=false;
      return;
    }
    //console.log("Sign in user changed", val);
    //console.log(val);
    //self.AC.googleLogin(val.getAuthResponse().id_token);
    //if(window['auth2'].isSignedIn.get())
    //self.AC.user=val;
    //else{}
  }
  attachSignin(element, self) {
    window['auth2'].attachClickHandler(element, {}, self.google_success, self.google_failed);
  }
  ngAfterViewInit() {
    this.startApp();
  }
  google_success(googleUser) {
    //console.log(googleUser);
  }
  google_failed(error) {
    console.log(error);
  }
  logout(){
    var self=this;
    //this.AC.logout().subscribe(data=>{
      window['auth2'].signOut();
      self.refresh();
    //})
    
  }
  login(){
    window['auth2'].signIn();
  }
  refresh(){
    var self=this;
    if(window['auth2'].isSignedIn.get()==true){
      // 
      console.log(window['auth2'].currentUser.get())
      self.AC.user=window['auth2'].currentUser.get();
      self.AC.islogged=true;
    } else {
      self.AC.user=null;
      self.AC.islogged=false;
    }
    this.cdr.detectChanges();
    //console.log(this);
  }
}
