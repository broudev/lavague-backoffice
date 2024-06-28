import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-success-dialog',
    templateUrl: './success-dialog.component.html',
    styleUrls: ['./success-dialog.component.css']
})
export class SuccessDialogComponent implements OnInit {

    public message: string  = '';

    constructor(
        private _dialogRef: MatDialogRef<SuccessDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,

    ) { }

    ngOnInit(): void {
        if (this.data != null) {
            this.message = this.data.message;
        }
    }

    confirm() {
        this._dialogRef.close('confirm');
    }

    cancel() {
        this._dialogRef.close('cancel');
    }

}
