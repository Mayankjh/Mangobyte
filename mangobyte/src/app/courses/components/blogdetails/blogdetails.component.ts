import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/blog/blog.service';
declare var $:any;
@Component({
  selector: 'app-blogdetails',
  templateUrl: './blogdetails.component.html',
  styleUrls: ['./blogdetails.component.scss']
})
export class BlogdetailsComponent implements AfterViewInit {

  id
  constructor(private route:ActivatedRoute, private BS:BlogService) {
    this.BS.addChild(this);
   }

  ngAfterViewInit() {
    $.getScript('../../../assets/js/main.js');
  }
  ngOnInit(){
    this.route.params.subscribe(params=>{
      this.id=params['id'];
    })
    this.refresh();
    this.BS.getblog(this.id, this);
  }
  blog
  refresh(){
  }


}
