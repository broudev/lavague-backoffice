import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/material-module';

@Component({
    selector: 'app-update-action',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule
    ],
    templateUrl: './update-action.component.html',
    styleUrls: ['./update-action.component.css']
})
export class UpdateActionComponent implements OnInit {

    public order_code: any;

    constructor(
        private _dialogRef: MatDialogRef<UpdateActionComponent>,

    ) { }

    ngOnInit(): void {

    }

    confirm() {
        this._dialogRef.close('confirm');
        /* const generate_order_code = augmente avec le code
        this.order_code = "ST22062023/"+generate_product_code;*/
    }

    cancel() {
        this._dialogRef.close('cancel');
    }

}
