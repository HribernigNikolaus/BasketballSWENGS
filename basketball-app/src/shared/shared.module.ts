import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {DateValueAccessor} from "./validation/date-value-accessor";


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [

    DateValueAccessor
  ],
  exports: [
    DateValueAccessor
  ]
})

export class SharedModule{}
