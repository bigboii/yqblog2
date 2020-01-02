import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../shared/angular-material.module';
import { SignInDialog } from './chat.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
  ],
  declarations: [ChatComponent, SignInDialog],
  // bootstrap: [ChatComponent],  
  entryComponents: [             // For any component loaded into a dialog, must include component into entryComponents in NgModule definition
    SignInDialog                 // https://material.angular.io/components/dialog/overview
  ]
})
export class ChatModule { }
