import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { BlogcategoryService } from './blogcategory.service';
var $:any;
@Component({
  selector: 'app-blogcategory',
  templateUrl: './blogcategory.component.html',
  styleUrls: ['./blogcategory.component.scss']
})
export class BlogcategoryComponent implements OnInit {
  @Input() childBlogCategories:string;
  private clevelblogs=[]
  constructor(private BCS:BlogcategoryService, private cdr:ChangeDetectorRef) { 
    BCS.child_elements.push(this);
  }

  ngOnInit() {
    this.refresh();
  }
  refresh(){
    var parent=null;
    console.log(this.childBlogCategories);
    if(this.childBlogCategories!='root'){
      // get all the categories
      parent=this.childBlogCategories;
    }
    for(var cat in this.BCS.BlogCategories){
        if(this.BCS.BlogCategories[cat].parent==parent)this.clevelblogs.push(cat);
    }
    this.cdr.detectChanges();
    console.log('I was calledd')
  }
  

}

        
