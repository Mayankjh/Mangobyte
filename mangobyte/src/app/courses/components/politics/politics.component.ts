import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-politics',
  templateUrl: './politics.component.html',
  styleUrls: ['./politics.component.scss']
})
export class PoliticsComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {
    $.getScript('../../../assets/js/main.js');
  }

}
