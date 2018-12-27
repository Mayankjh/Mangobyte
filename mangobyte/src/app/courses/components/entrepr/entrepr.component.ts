import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-entrepr',
  templateUrl: './entrepr.component.html',
  styleUrls: ['./entrepr.component.scss']
})
export class EntreprComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {
    $.getScript('../../../assets/js/main.js');
  }


}
