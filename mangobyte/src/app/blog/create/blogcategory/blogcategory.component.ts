import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { BlogcategoryService } from './blogcategory.service';
var $:any;
@Component({
  selector: 'app-blogcategory',
  templateUrl: './blogcategory.component.html',
  styleUrls: ['./blogcategory.component.scss']
})
export class BlogcategoryComponent implements OnInit {
  @Input() parentBlogCategory:string='';
  @Input() parent_element:any;
  private clevelblogs=[]
  constructor(private BCS:BlogcategoryService, private cdr:ChangeDetectorRef) { 
    BCS.child_elements.push(this);
  }

  ngOnInit() {
    this.refresh();
  }
  refresh(){
    var parent=null;
    this.clevelblogs=[];
    //console.log(this.parentBlogCategory);
    if(this.parentBlogCategory==undefined || this.parentBlogCategory=='') this.parentBlogCategory='root';
    if(this.parentBlogCategory!='root'){
      parent=this.parentBlogCategory;
    }
    for(var cat in this.BCS.BlogCategories){
        if(this.BCS.BlogCategories[cat].category==parent)this.clevelblogs.push(cat);
    }
  }
  toggle_child(blgc){
    var e=document.getElementById(blgc);
    if(e.style.display=='none') e.style.display='block';
    else e.style.display='none';
  }
  hide_child=true;
  show_cnew(){
    if(this.parentBlogCategory==undefined)this.parentBlogCategory='';

    document.getElementById(this.parentBlogCategory+'_cnew_div').style.display='block';
  }
  hide_cnew(){
    document.getElementById(this.parentBlogCategory+'_cnew_div').style.display='none';
  }
  add_blog(){
    this.BCS.create_bc(this.parentBlogCategory, document.getElementById(this.parentBlogCategory+'_cnew_input')['value']);
    document.getElementById(this.parentBlogCategory+'_cnew_input')['value']='';
    this.hide_cnew();
    
  }
}

        
