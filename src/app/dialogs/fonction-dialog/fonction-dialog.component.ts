import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MaterialModule } from '@app/material-module';
import { NotificationService } from '@app/services/notifications/notification.service';
import { MainTreatmentsService } from '@app/services/treatments/main-treatments.service';

@Component({
    selector: 'app-fonction-dialog',
    standalone: true,
    imports: [CommonModule, MaterialModule, FormsModule],
    templateUrl: './fonction-dialog.component.html',
    styleUrl: './fonction-dialog.component.css',
})
export class FonctionDialogComponent implements OnInit {


    public fonctions: string = '';
    public montants: number = 0;
    public is_update: boolean = false;
    public item_slug: any;
    public is_loading: boolean = false;



    constructor(
        private _notificationService: NotificationService,
        private _traitement: MainTreatmentsService,
        private _router: Router,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<FonctionDialogComponent>,

    ) { }


    ngOnInit() {

        if (this.data != null) {
            this.is_update = true;
            this.fonctions = this.data.fonctions;
            this.montants = this.data.montants;
            this.item_slug= this.data.slug;

        }
    }





    saveFonction() {

        if (this.fonctions == '') {
            this._notificationService.openSnackBarSimpleError("La fonction est obligatoire");
            return
        }

        if (this.montants == 0) {
            this._notificationService.openSnackBarSimpleError("Le montant est obligatoire");
            return
        }

        const data = {
            fonctions: this.fonctions.toUpperCase(),
            montants: this.montants
        }


        this.is_loading = true;

        this._traitement.saveFonctions(data).subscribe({

            next: (response: any) => {
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


    updateFonction() {

        if (this.fonctions == '') {
            this._notificationService.openSnackBarSimpleError("La fonction est obligatoire");
            return
        }

        if (this.montants == 0) {
            this._notificationService.openSnackBarSimpleError("Le montant est obligatoire");
            return
        }

        const data = {
            fonctions: this.fonctions.toUpperCase(),
            montants: this.montants
        }

        this.is_loading = true;

        this._traitement.updateFonctions(data, this.item_slug).subscribe({

            next: (response: any) => {
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
