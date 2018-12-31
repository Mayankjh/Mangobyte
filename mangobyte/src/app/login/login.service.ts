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
    id:number,
    token:string 
  }
  public child;
  constructor(public http: HttpClient) { 
    /**
     * 1 . Contact server to get details of cookies and all....
     * 2 . Save those details in local variable
     */
    // check if auth toke exists or not
    var token = localStorage.getItem('auth_token');
    if(token==null){
      // user not logged
      this.data={
        islogged:false,
        id:-1,
        token:''
      }
    } else {
      // user is logged
      this.data={
        islogged:true,
        id:Number(localStorage.getItem('auth_id')),
        token:token
      }
      
    }
    //console.log('I was here');*/
    // this.serverurl = "http://localhost:8000/";

  }
  login(username:string, password:string){
    this.http.post(this.serverurl+'login',
        new HttpParams()
          .set('username', username)
          .set('password', password),
        { 
          // no headers needed to be sent this time
          observe:'response'
        }
      ).subscribe((response)=>{
        if(response.status==200){
          //login sucessfull
          var data = response.body;
          this.data.token = data['token'];
          this.data.id=data['id'];
          this.data.islogged=true;
          localStorage.setItem('auth_token', this.data.token);
          localStorage.setItem('id', this.data.id+'');

        } 
        this.child.refresh();
      }, (error)=>{
        if(error.status==400 || 404){
          // failure
          alert('Wrong credentials were provided, please provide the correct details');
        }
        //console.log(error);
      }, ()=>{
        console.log();
      });
  }

  logout(){
    this.http.get(this.serverurl+'logout',
        { 
          // no headers needed to be sent this time
          observe:'response',
          headers:new HttpHeaders()
            .set('Authorization', 'token '+this.data.token)
        }
      ).subscribe((response)=>{
        if(response.status==200 && response.body['status']=='loggedout'){
          
          localStorage.removeItem('auth_token');
          localStorage.removeItem('id');
          this.data={
            islogged:false,
            id:-1,
            token:''
          }

        } else if(response.status==400 || 404){
          // failure
          alert('Wrong credentials were provided');
        }
        //console.log(response, this.child);
        this.child.refresh();
      });
  }
}
