import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { BlogcategoryService } from 'src/app/blog/create/blogcategory/blogcategory.service';
import { BlogService } from 'src/app/blog/blog.service';
import { LoginService } from 'src/app/login/login.service';
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
  constructor(private BCS:BlogcategoryService, 
    private BLS:BlogService,private LS:LoginService, private cdr:ChangeDetectorRef) { 
    BCS.addChild(this);
    BLS.addChild(this);
  }
  editable=false
  refresh(){
    //console.log(this.parent_bc);
    console.log(this.blog_list, this.group_list, this.BCS.BlogCategories);
    if(!(this.parent_bc in this.BCS.BlogCategories)) return;
    this.group_list=this.BCS.BlogCategories[this.parent_bc].child_categories;
    this.blog_list=this.BCS.BlogCategories[this.parent_bc].child_blogs;    
    this.cdr.detectChanges();
  }
  changeto(v){
    //console.log(v);
    this.parent_bc=v;
    this.refresh();
  }
  ngOnInit() {
    console.log(this.parent_bc);
    this.refresh();
  }
  ngAfterViewInit() {
    $.getScript('../assets/js/main.js');
  }
  get_id_from_url(url){
    return url.split("/")[5]
  }
  type(body){
    if(body==undefined || body==null) return -1;
    return Object.keys(body).length
  }
  dump(str){
    console.log(str);
    return str;
  }
}
