import { Injectable, ChangeDetectorRef } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { HttpParams, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BlogcategoryService {
  child_elements:any=[]
  BlogCategories=[]
  constructor(private ls:LoginService) {
    this.getAllBlogCategories();
   }
  getAllBlogCategories(){
    this.ls.http.get(this.ls.serverurl+'blogs/blogcategory/').subscribe(
      (data:any)=>{
        //console.log(data);
        data.forEach(element => {
          this.BlogCategories[element.url]=element;
        });
        //console.log(this.BlogCategories, this.child_elements);
        this.refresh();
      },
      error=>{
        console.log(error);
      }
    )
  }
  refresh(){
    this.child_elements.forEach(element => {
      element.refresh();
    });
  }
  create_bc(parent_url:string, child_name:string){
    if(parent_url=="root") parent_url="";
     this.ls.http.post(this.ls.serverurl+"blogs/blogcategory/",
      new HttpParams()
        .set('name', child_name)
        .set('parent', parent_url)
        .set('creator', this.ls.user.url)
        .set('body', 'Empty')
        ,
      {
        headers:new HttpHeaders()
          .set('Authorization', 'Token '+this.ls.data.token)
      }
      ).subscribe(data=>{
        console.log(data);
        this.getAllBlogCategories();
      }, error=>{
    
      });
  }
}
