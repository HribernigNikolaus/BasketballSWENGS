import { Component, OnInit } from '@angular/core';
import {Stadium} from "../../entities/stadium";
import {StadiumService} from "../stadium-service/stadium.service";
import {ActivatedRoute} from "@angular/router";
import {FormGroup, FormBuilder} from '@angular/forms';


@Component({
  selector: 'stadium-edit',
  templateUrl: './stadium-edit.component.html',
  styleUrls: ['./stadium-edit.component.css']
})
export class StadiumEditComponent implements OnInit {

  id: string;
  showDetails: string;

  stadium: Stadium;
  errors: string;

  editForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private stadiumService: StadiumService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.id = params['id'];
        this.showDetails = params['showDetails'];

        this.stadiumService.findById(this.id).subscribe(
          stadium => { this.stadium = stadium; this.errors=''; },
          err => {this.errors = 'Fehler!'; }
        );
      }
    )

    this.editForm = this.fb.group({
      id: [],
      buildDate: [],
      city: [],
      land: [],
      name: [],
      plz: [],
      streetAndNumber: [],
      teams: [],
      visitorLimit: []
    })
  }

  saveStadium() {
    this.stadiumService.save(this.stadium).subscribe(
      stadium => {
        this.stadium = stadium;
        this.errors = 'Saving was successful!';
      },
      err=> { this.errors = 'Error saving data'; }
    );
  }

}
