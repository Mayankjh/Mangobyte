import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { BlogcategoryService } from 'src/app/blog/create/blogcategory/blogcategory.service';
import { BlogService } from 'src/app/blog/blog.service';
declare var $:any;
@Component({
  selector: 'app-previewdisplayer',
  templateUrl: './previewdisplayer.component.html',
  styleUrls: ['./previewdisplayer.component.scss']
})
export class PreviewdisplayerComponent implements OnInit {
  @Input() parent_bc:string;
  group_list=[]
  blog_list=[]
  constructor(private BCS:BlogcategoryService, private BLS:BlogService, private cdr:ChangeDetectorRef) { 
    BCS.child_elements.push(this);
    BLS.child_elements.push(this);
    if(this.BLS.allBlogs==null){
      this.BLS.getAllBlogs();
    }
  }
  refresh(){
    console.clear();
    console.log('clear', this.BCS.BlogCategories);
    this.group_list=[];
    for(var x in this.BCS.BlogCategories){
      if(this.BCS.BlogCategories[x].parent==this.parent_bc){
        this.group_list.push(this.BCS.BlogCategories[x].url);
      }
    }
    for(var x in this.BLS.allBlogs){
      if(this.BLS.allBlogs[x].category==this.parent_bc)
      this.blog_list.push(x);
    }
    console.log(this.blog_list);

    

    this.cdr.detectChanges();
  }
  ngOnInit() {
    
  }
  

}
