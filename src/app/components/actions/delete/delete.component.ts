import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/material-module';

@Component({
    selector: 'app-delete',
    standalone: true,
    imports: [CommonModule, MaterialModule],
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

    public order_code: any;

    constructor(
        private _dialogRef: MatDialogRef<DeleteComponent>,

    ) { }

    ngOnInit(): void {

    }

    confirm() {
        this._dialogRef.close('confirm');
    }

    cancel() {
        this._dialogRef.close('cancel');
    }


}
