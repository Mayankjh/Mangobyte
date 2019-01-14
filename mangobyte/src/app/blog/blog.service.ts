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
  public allBlogs:any;
  getAllBlogs(){
    this.ls.http.get(this.ls.serverurl+"blogs/blog/",
        {
          headers: this.ls.getHeaders()
        }
    ).subscribe(data=>{
      /*console.log(data); */
      this.allBlogs=data;
      for(let x of this.allBlogs){
        if(x.body.disc==undefined){
          x.body=JSON.parse(x.body);
        }
      }
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
        .set('body', JSON.stringify({
          date:'10 Dec 2019',
          username:'Admin',
          media_url:'../assets/images/course-5.jpg',
          disc:'This is the body of the blog'
        })),
        {
          headers:this.ls.getHeaders()
        }
      ).subscribe(data=>{
        alert("Blog created successfully")
      }, error=>{
        console.log('errror')
      })
  }
  update_blog(url, name, body){
    this.ls.http.patch(url, new HttpParams()
              .set('name', name)
              .set('body', body),
              {headers:this.ls.getHeaders()}
    ).subscribe(data=>{
      this.getAllBlogs();
    }, error=>{
      console.log(error)
    })
  }
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
  deleteBlog(url){
    this.ls.http.delete(url, {
      headers:this.ls.getHeaders()
    }).subscribe(
      data=>{
        this.getAllBlogs();
        alert("The blog was deleted");
      }
    )
  }
}

