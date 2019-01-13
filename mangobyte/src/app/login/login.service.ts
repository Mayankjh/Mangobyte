import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';

//var $:any;
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public serverurl:string="http://hashblog.herokuapp.com/";
  public data:{
    islogged:boolean,
    token:string 
  }
  public user:any;
  public child;
  constructor(public http: HttpClient) { 
    this.data={
      islogged:false,
      token:''
    }
    // this.serverurl = "http://localhost:8000/";
    var token = localStorage.getItem('auth_token');
    if(token==null){
      // user not logged
      // _tell child elements to get their body content
      
      
    } else {
      // user can be logged
      this.check_user();
      
    }
     /*window['httpclient']=this.http;
     window['httpheader']=new HttpHeaders();
     window['httpparam']=new HttpParams();*/

  }
  check_user(){
    this.http.get(this.serverurl+'users/1/', 
    { 
      headers:new HttpHeaders()
        .set('Authorization', 'Token '+localStorage.auth_token)
    }
    ).subscribe(data=>{
        this.user = data;
        this.data.islogged = true;
        this.data.token = localStorage.getItem('auth_token')
        console.log(data)
      }, error=>{
        this.data={
          islogged:false,
          token:''
        }
        localStorage.removeItem('auth_token');
    }, ()=>{
      
    })
  }
  login(username:string, password:string){
    this.http.post(this.serverurl+'login/',
        new HttpParams()
          .set('username', username)
          .set('password', password),
        { 
          // no headers needed to be sent this time
          observe:'response'
        }
      ).subscribe((response)=>{
        //console.log(response);
        if(response.status==200){
          //login sucessfull
          var data = response.body;
          this.data.token = data['token'];
          this.data.islogged=true;
          localStorage.setItem('auth_token', this.data.token);
          console.log(response, localStorage.getItem('auth_token'));
          this.check_user();
        } 
        this.child.refresh();
        this.refresh();
      }, (error)=>{
        if(error.status==400 || 404){
          // failure
          alert('Wrong credentials were provided, please provide the correct details');
        }
      }, ()=>{
        document.getElementById("logindiv").style.display="none";
        this.refresh();
        //window.location.reload();
        //alert('Login Successful');
        
      });
  }

  logout(){
    this.http.post(this.serverurl+'logout/',{},
        { 
          // no headers needed to be sent this time
          observe:'response',
          headers:new HttpHeaders()
            .set('Authorization', 'Token '+this.data.token)
        }
      ).subscribe((response)=>{
        console.log(response);
        localStorage.removeItem('auth_token');
        if(response.status==200 || response.status==204){
          
          localStorage.removeItem('auth_token');
          this.data={
            islogged:false,
            token:''
          }

        } else if(response.status==400 || 404){
          // failure
          alert('Wrong credentials were provided');
        }
        //console.log(response, this.child);
        this.child.refresh();
      }, (error)=>{
        localStorage.removeItem('auth_token');
        this.data={
          islogged:false,
          token:''
        }
      });
  }
  public getHeaders(){
    if(this.data.islogged)
    return new HttpHeaders().set("Authorization", "Token "+ this.data.token);
    else return new HttpHeaders();
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
