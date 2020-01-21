import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MLClientComponent } from './ml-client.component';
import { DragDropModule } from '@angular/cdk/drag-drop'
import { AngularMaterialModule } from '../../shared/angular-material.module'
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DragDropDirective} from '../../shared/directives/drag-drop.directive';
import { DragdropSnackbarComponent } from './dragdrop-snackbar/dragdrop-snackbar.component'
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [MLClientComponent, DragDropDirective, DragdropSnackbarComponent],
  imports: [
    CommonModule,
    DragDropModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class MLClientModule { 

}
