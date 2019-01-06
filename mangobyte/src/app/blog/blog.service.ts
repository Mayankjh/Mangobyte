import { Injectable } from '@angular/core';
import {LoginService} from '../login/login.service';
import { HttpBackend, HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BlogService {
  public child;
  public child_elements:any=[];
  constructor(private ls:LoginService) {
    // check the existing permissions of the user regarding this blog

  }
  public allBlogs:any;
  getAllBlogs(){
    this.ls.http.get(this.ls.serverurl+"blogs/blog/",
        {
          headers: this.ls.getHeaders()
        }
    ).subscribe(data=>{
      /*console.log(data); */
      this.allBlogs=data;
      this.refresh();
    }, error=>{console.log(error)});
  }
  getblog(no, child){
    console.log(this.ls.data.token);
    this.ls.http.get(this.ls.serverurl+"blogs/blog/"+no+"/",
        {
          headers: this.ls.getHeaders()
        }
    ).subscribe(data=>{console.log(data); child.blog=data;child.refresh();}, error=>{console.log(error)});
  }
  create_blog(name:string, cateblg_url:string,type:string){
    this.ls.http.post(this.ls.serverurl+'blogs/blog/',
      new HttpParams()
        .set('name', name)
        .set('creator', this.ls.user.url)
        .set('category', cateblg_url)
        .set('blog_type', type)
        .set('body', '{}'),
        {
          headers:this.ls.getHeaders()
        }
      ).subscribe(data=>{
        alert("Blog created successfully")
      }, error=>{
        console.log('errror')
      })
  }
  refresh(){
    this.child_elements.forEach(element => {
      element.refresh();
    });
  }
}

