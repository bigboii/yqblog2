import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../shared/angular-material.module';
import { SignInDialog } from './chat-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SocketService } from './service/socket.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FlexLayoutModule,
  ],
  declarations: [
    ChatComponent, 
    SignInDialog
  ],
  providers:[
    SocketService
  ], 
  entryComponents: [             // For any component loaded into a dialog, must include component into entryComponents in NgModule definition
    SignInDialog,                 // https://material.angular.io/components/dialog/overview
    ChatComponent
  ]
})
export class ChatModule { }
