import { Component, OnInit, Input } from '@angular/core';
import { BlogcategoryService } from './blogcategory.service';

@Component({
  selector: 'app-blogcategory',
  templateUrl: './blogcategory.component.html',
  styleUrls: ['./blogcategory.component.scss']
})
export class BlogcategoryComponent implements OnInit {
  @Input() childBlogCategories:any;
  constructor(private BCS:BlogcategoryService) { 
    
  }

  ngOnInit() {
    if(this.childBlogCategories=='root'){
      // get all the categories
    }
  }

}
