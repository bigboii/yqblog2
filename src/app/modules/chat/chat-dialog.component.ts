import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

/*
  Dialog
*/
export interface DialogData {
    userName: string;
}

@Component({
    selector: 'chat-dialog',
    templateUrl: 'chat-dialog.component.html',
    styleUrls: ['chat-dialog.component.scss']
})
export class SignInDialog {

public userNameForm = new FormControl('', [Validators.required]);

constructor(
    public dialogRef: MatDialogRef<SignInDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

onNoClick(): void {
    this.dialogRef.close();
}

onSubmit(dialogType: string): void {
    console.log("userNameForm");
    console.dir(this.userNameForm);
    this.dialogRef.close({
    username: this.userNameForm.value,
    dialogType: "new"
    });
}

}