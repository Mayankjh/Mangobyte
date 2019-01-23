import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http'
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  serverurl = "http://localhost:8000/"
  startApp
  constructor(public http:HttpClient, LS:LoginService) { 
    //this.serverurl="https://hashbook.herokuapp.com/"
    var self = this;
    this.startApp = function () {
      window['gapi'].load('auth2', function () {
        window['auth2'] = window['gapi'].auth2.init({
          client_id: '716951121838-plvdimng1engvdjog7fp8hlg8g8th6c2.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        //self.attachSignin(document.getElementById('google_login_btn'), self);
      
      
      window['auth2'].isSignedIn.listen((val)=>{self.signinChanged(val,self)});
      window['auth2'].currentUser.listen(val=>self.userChanged(val, self));
      if(window['auth2'].isSignedIn.get()==true){
        // 
        console.log(window['auth2'].currentUser.get())
        self.user=window['auth2'].currentUser.get();
        self.islogged=true;
      } else {
        self.user=null;
        self.islogged=false;
      }

      });


    };
  }
  signinChanged(val, self){
    //console.log("sign in state changed to", val, self);
    // check the server for the user details, if token valid, hurray, continue
    if(!val){  
    self.user=null;
      self.islogged=false;
    }
    this.refresh();
    // else provide the id_token to signin again
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
  userChanged(val, self){
    if(!val.isSignedIn()) {
      self.user=null;
      self.islogged=false;
      return;
    }
    //console.log("Sign in user changed", val);
    //console.log(val);
    //self.googleLogin(val.getAuthResponse().id_token);
    //if(window['auth2'].isSignedIn.get())
    //self.user=val;
    //else{}
  }
  islogged=false
  user:any=null;
  token:string=null;
  googleLogin(id_token){
    return this.http.post(this.serverurl+'logingoogle/', new HttpParams().set('id_token', id_token))
      .subscribe(data=>{
        if(data['token'] != 'failed') {
          this.token=data['token']
          this.islogged=true
          // here 
          this.refresh();
        }
      })
  }
  checkuser(){

  }
  
  child_elements:any=[]
  addChild(element:any){
    if(this.child_elements.indexOf(element)==-1)
      this.child_elements.push(element)
    else console.log("Element already existed")
    
  }
  refresh(){
    var self=this;
    if(window['auth2'].isSignedIn.get()==true){
      // 
      console.log(window['auth2'].currentUser.get())
      self.user=window['auth2'].currentUser.get();
      self.islogged=true;
    } else {
      self.user=null;
      self.islogged=false;
    }
    for(let x of this.child_elements) x.refresh();
  }

}
