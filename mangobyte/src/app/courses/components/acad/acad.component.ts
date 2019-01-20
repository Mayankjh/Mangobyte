import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-acad',
  templateUrl: './acad.component.html',
  styleUrls: ['./acad.component.scss']
})
export class AcadComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {
    $.getScript('../../../assets/js/main.js');
  }


}
