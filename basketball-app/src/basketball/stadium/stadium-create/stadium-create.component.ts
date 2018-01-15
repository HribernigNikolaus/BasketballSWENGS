import {Stadium} from "../../entities/stadium";
import {StadiumService} from "../stadium-service/stadium.service";
import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {StadiumValidationDirective} from "../../../shared/validation/stadium-validation.directive";


@Component({
  selector: 'stadium-create',
  templateUrl: './stadium-create.component.html',
  styleUrls: ['./stadium-create.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StadiumCreateComponent implements OnInit {

  id: string;
  showDetails: string;

  stadium: Stadium;
  errors: string;

  stadiumForm: FormGroup;

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

    this.stadiumForm = this.fb.group({
      id: [],
      buildDate: [],
      city: [],
      land: [],
      name: ['', Validators.required, Validators.min(4), Validators.max(24)],
      plz : [],
      streetAndNumber : [],
      teams : [],
      visitorLimit : []

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
