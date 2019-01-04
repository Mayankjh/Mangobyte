import { Injectable, ChangeDetectorRef } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';


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
}
