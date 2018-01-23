import {Component, OnInit, ViewChild} from '@angular/core';
import {AgmMap} from "@agm/core";


@Component({
  selector: 'impressum',
  templateUrl: 'impressum.component.html',
  styleUrls: ['./impressum.component.css']
})


export class ImpressumComponent {
  title: string = 'Joanneum Location';
  lat: number = 47.069082;
  lng: number = 15.409920;
  zoom: number = 16;
  @ViewChild('agmMap') agmMap : AgmMap;


  ngOnInit() {
    this.agmMap.triggerResize();
  }

}
