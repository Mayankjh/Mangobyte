import { Injectable } from '@angular/core';
import {LoginService} from '../login/login.service';
import { HttpBackend, HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BlogService {
  public child;
  constructor(private ls:LoginService) {
    // check the existing permissions of the user regarding this blog
  
  }
  getblog(no, child){
    console.log(this.ls.data.token);
    this.ls.http.get(this.ls.serverurl+"blogs/blog/"+no+"/",
        {
          headers: new HttpHeaders()
          .set('Authorization', 'Token '+this.ls.data.token)
        }
    ).subscribe(data=>{console.log(data); child.blog=data;child.refresh();}, error=>{console.log(error)});
  }
}

