import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  blogCategories
  constructor() {
    this.blogCategories='root'
   }

  ngOnInit() {
    
  }

}
