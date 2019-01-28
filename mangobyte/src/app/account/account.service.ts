import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http'
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  startApp
  initialized=false;
  constructor(public http:HttpClient,private LS:LoginService) { 
    var self = this;
    if(this.initialized) return;
    this.initialized=true;
    this.startApp = function () {
      window['gapi'].load('auth2', function () {
        window['auth2'] = window['gapi'].auth2.init({
          client_id: '716951121838-plvdimng1engvdjog7fp8hlg8g8th6c2.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        window['auth2'].isSignedIn.listen((val)=>{self.signinChanged(val,self)});
        window['auth2'].currentUser.listen(val=>self.userChanged(val, self));
        if(window['auth2'].isSignedIn.get()==true){
          // check login service that if user is logged or not
          if(self.LS.islogged){
            // nothing to do from server side
          } else {
            // user not already logged, so google login now note: login can still be denied from LS
            self.LS.google_login(window['auth2'].currentUser.get().getAuthResponse().id_token);
          } 
        }
      });
    };
  }
  signinChanged(val, self){
    /**
     * on refresh if
     *  user is logged : it will be called
     *  user is not logged : it wont be called
     * on login change: it will be called
     */
    if(val){
      // user is signed in
      this.LS.google_login(window['auth2'].currentUser.get().getAuthResponse().id_token);
    } else {
      // user is logged out, first logout from LS

    }
  }
  google_success(googleUser) {
    console.log(googleUser);
  }
  google_failed(error) {
    console.log(error);
  }
  logout(){
    var self=this;
    this.LS.logout((()=>{
      window['auth2'].signOut();
    }))
    
  }
  login(){
    window['auth2'].signIn();
  }
  userChanged(val, self){
    if(!val.isSignedIn()) {
      self.user=null;
      self.islogged=false;
      return;
    }
  }
  
}
