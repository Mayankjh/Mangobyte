import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit  {

  constructor() { }

  ngAfterViewInit() {
    $.getScript('../assets/js/main.js');
  }

}
