import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';

//var $:any;
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public serverurl:string="https://hashblog.herokuapp.com/";
  public data={
    user:null,
    token:null
  }
  public islogged = false;
  public verified = false;
  public after_verify:any=[];

  constructor(public http:HttpClient){
    this.serverurl="http://localhost:8000/";
    // check if user details present or not
      var token = localStorage.getItem('auth_token');
      //user = localStorage.getItem('auth_user');
      if(token==null){
        // user is not logged
        this.islogged = false;
        this.verified = true;
      } else {
        this.check_user(token);
      }
  }
  check_user(token){
    var self=this;
    // check the server for user details
    this.http.get(this.serverurl+'users/status/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+token)
      }).subscribe(data=>{
          try{
          self.data.token=token;
          self.data.user = data['user'];
          self.data.user.info = JSON.parse(data['user'].info);
          self.islogged = true;
          localStorage.setItem('auth_token', token);
          console.log(self.data.user);
          self.refresh();
          } catch(e){
            console.log(e);
          }
        }, error => {
          console.log('errors occured', error);
          self.islogged=false;
          // remove un-necessary token
          localStorage.removeItem('auth_token');
        }, ()=>{
          self.verified = true;
          console.log("User is verified now ")
          for(let x of self.after_verify){
            x();
          }
          self.after_verify=[];
        });
  }
  google_signup(id_token){
    if(this.islogged){
      // already logged in
      alert("You must logout before creating any new account");
    } else {
      // rest is same as google login
      this.google_login(id_token);
    }
  }
  google_login(id_token){
    // login only if verified == true
    if(this.verified == false){
      console.log("User is not verified from server yet, so pushing the login to queue");
      var self=this;
      this.after_verify.push(()=>{self.google_login(id_token);})
    } else {
      // user is verified
      if(this.islogged){
        console.log("user is already logged in, aborting!!!");
      } else {
        // its verified that user is not logged, so googl loging in now...
        console.log('I was here')
        this.http.post(this.serverurl+'logingoogle/', new HttpParams().set('id_token', id_token), {
        }).subscribe(data=>{
            this.check_user(data['token']);
        })
      }
    }
  }
  onLoginSuccess(token){
    this.islogged=true;
  }
  up_login(username, password){
    if(this.islogged) {
      alert("User is already logged!!");
    }
  }
  logout(after=()=>{}){
    this.http.post(this.serverurl+'logout/',{}, {headers:this.getHeaders()}).subscribe(data=>{
      after();
      this.islogged=false;
      this.data.user=null;
      this.refresh();
    })
  }
  public getHeaders(){
    if(this.islogged)
    return new HttpHeaders().set("Authorization", "Token "+ this.data.token);
    else return new HttpHeaders();
  }
  login(){

  }
  
  
  
  
  //refresh childs
  
  child_elements=[];
  refresh(){
    for(let x in this.child_elements){
      this.child_elements[x].refresh();
    }
  }
  addChild(x:any){
    if(this.child_elements.indexOf(x)==-1){
      this.child_elements.push(x);
    }
  }
}

