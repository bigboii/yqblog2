import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MLClientComponent } from './ml-client.component';
import { DragDropModule } from '@angular/cdk/drag-drop'
import { AngularMaterialModule } from '../../shared/angular-material.module'
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DragDropDirective} from '../../shared/directives/drag-drop.directive'


@NgModule({
  declarations: [MLClientComponent, DragDropDirective],
  imports: [
    CommonModule,
    DragDropModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class MLClientModule { 

}
