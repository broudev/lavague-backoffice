import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MaterialModule } from '@app/material-module';
import { NotificationService } from '@app/services/notifications/notification.service';
import { MainTreatmentsService } from '@app/services/treatments/main-treatments.service';

@Component({
    selector: 'app-quartiers-dialog',
    standalone: true,
    imports: [CommonModule, MaterialModule, FormsModule],
    templateUrl: './quartiers-dialog.component.html',
    styleUrl: './quartiers-dialog.component.css',
})
export class QuartiersDialogComponent implements OnInit {


    public quartiers: string = '';
    public is_update: boolean = false;
    public item_slug: any;
    public is_loading: boolean = false;


    constructor(
        private _notificationService: NotificationService,
        private _router: Router,
        private _traitement: MainTreatmentsService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<QuartiersDialogComponent>

    ) { }


    ngOnInit() {

        if (this.data != null) {
            this.is_update = true;
            this.quartiers = this.data.quartiers;
            this.item_slug= this.data.slug;

        }
    }





    saveQuartier() {

        if (this.quartiers == '') {
            this._notificationService.openSnackBarSimpleError(
                'Le rôle est obligatoire'
            );
            return;
        }

        const data = {
            quartiers: this.quartiers
        }


        this.is_loading = true;



        this._traitement.saveQuartier(data).subscribe({

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


    updateQuartier() {

        if (this.quartiers == '') {
            this._notificationService.openSnackBarSimpleError(
                'Le rôle est obligatoire'
            );
            return;
        }

        const data = {
            quartiers: this.quartiers
        }

        this.is_loading = true;

        this._traitement.updateQuartier(data, this.item_slug).subscribe({

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
