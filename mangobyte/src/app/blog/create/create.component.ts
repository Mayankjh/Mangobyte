import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  blogCategories:string;
  constructor(private bs:BlogService) {
    this.blogCategories='root'
  }
  selected_blc:string;
  public selected_blog_category(value){
    document.getElementById('blc-card').style.display='none';
    document.getElementById('blc-v').innerText=value.name;
    this.selected_blc = value.url;
  }
  show_blog_categories(){
    //console.log('was asked to show')
    document.getElementById('blc-card').style.display='block';
  }
  ngOnInit() {
    
  }
  create_blog(){
    this.bs.create_blog(
      document.getElementById('createblg_name')['value'],
      this.selected_blc,
      document.getElementById('createblg_type')['value']
    )
  }
}
