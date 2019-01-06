import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements AfterViewInit{

  constructor() { }

  ngAfterViewInit() {
    $.getScript('../assets/js/main.js');
  }

}
