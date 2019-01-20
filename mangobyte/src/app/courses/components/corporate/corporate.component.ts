import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-corporate',
  templateUrl: './corporate.component.html',
  styleUrls: ['./corporate.component.scss']
})
export class CorporateComponent implements AfterViewInit{

  constructor() { }

  ngAfterViewInit() {
    $.getScript('../../../assets/js/main.js');
  }

}
