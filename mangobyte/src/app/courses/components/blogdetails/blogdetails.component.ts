import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-blogdetails',
  templateUrl: './blogdetails.component.html',
  styleUrls: ['./blogdetails.component.scss']
})
export class BlogdetailsComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {
    $.getScript('../../../assets/js/main.js');
  }


}
