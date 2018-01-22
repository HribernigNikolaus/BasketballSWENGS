import { Component, OnInit } from '@angular/core';
import {Stadium} from "../../entities/stadium";
import {ActivatedRoute, Router} from "@angular/router";
import {StadiumService} from "../stadium-service/stadium.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-stadium-view',
  templateUrl: './stadium-view.component.html',
  styleUrls: ['./stadium-view.component.css']
})
export class StadiumViewComponent implements OnInit {
  id: string;
  showDetails: string;

  stadium: Stadium;
  errors: string;


  constructor(
    private route: ActivatedRoute,
    private stadiumService: StadiumService,
    private fb: FormBuilder,
    private router:Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.id = params['id'];
        // if(this.id != null)
        //{
        this.showDetails = params['showDetails'];
        this.stadiumService.findById(this.id).subscribe(
          stadium => { this.stadium = stadium; this.errors=''; },
          err => {this.errors = 'Fehler!'; }
        );



      }
    )

  }



}
