import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material-module';
import { NotificationService } from '@app/services/notifications/notification.service';
import { MainTreatmentsService } from '@app/services/treatments/main-treatments.service';


@Component({
    selector: 'app-user-role-dialog',
    templateUrl: './user-role-dialog.component.html',
    styleUrls: ['./user-role-dialog.component.css'],
    standalone: true,
    imports: [CommonModule, MaterialModule, FormsModule],
})
export class UserRoleDialogComponent implements OnInit {


    public role: string = '';
    public is_update: boolean = false;
    public item_slug: any;
    public is_loading: boolean = false;


    constructor(
        private _notificationService: NotificationService,
        private _router: Router,
        private _traitement: MainTreatmentsService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<UserRoleDialogComponent>

    ) { }


    ngOnInit() {

        if (this.data != null) {
            this.is_update = true;
            this.role = this.data.role;
            this.item_slug= this.data.slug;

        }
    }





    saveRole() {

        if (this.role == '') {
            this._notificationService.openSnackBarSimpleError(
                'Le rôle est obligatoire'
            );
            return;
        }

        const data = {
            role: this.role
        }


        this.is_loading = true;



        this._traitement.saveRole(data).subscribe({

            next: (response: any) => {
                //console.log(response);
                if (response.code == 200) {
                    setTimeout(() => {
                        this._notificationService.openSnackBarSuccess(response);
                        this.is_loading = false;
                        this._dialogRef.close(true);
                    }, 1000);
                } else if (response.code == 302 || response.code == 300) {
                    this.is_loading = false;
                    this._notificationService.openSnackBarError(response);
                }
            },
            error: (error: any) => {

                if (error.status == 401) {
                    this._notificationService.openSnackBarTokenExpired();
                    localStorage.clear();
                    this._router.navigateByUrl('/');
                }
            }
        })

    }


    updateRole() {

        if (this.role == '') {
            this._notificationService.openSnackBarSimpleError(
                'Le rôle est obligatoire'
            );
            return;
        }

        const data = {
            role: this.role
        }

        this.is_loading = true;

        this._traitement.updateRole(data, this.item_slug).subscribe({

            next: (response: any) => {
                //console.log(response);
                if (response.code == 200) {
                    setTimeout(() => {
                        this._notificationService.openSnackBarSuccess(response);
                        this.is_loading = false;
                        this._dialogRef.close(true);
                    }, 1000);
                } else if (response.code == 302 || response.code == 300) {
                    this.is_loading = false;
                    this._notificationService.openSnackBarError(response);
                }
            },
            error: (error: any) => {

                if (error.status == 401) {
                    this._notificationService.openSnackBarTokenExpired();
                    localStorage.clear();
                    this._router.navigateByUrl('/');
                }
            }
        })

    }
}
