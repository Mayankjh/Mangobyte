import { Injectable } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';


@Injectable({
  providedIn: 'root'
})
export class BlogcategoryService {
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
      },
      error=>{
        console.log(error);
      }
    )
  }
}
