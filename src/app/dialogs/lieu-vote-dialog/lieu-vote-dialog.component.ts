import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MaterialModule } from '@app/material-module';
import { NotificationService } from '@app/services/notifications/notification.service';
import { MainTreatmentsService } from '@app/services/treatments/main-treatments.service';

@Component({
    selector: 'app-lieu-vote-dialog',
    standalone: true,
    imports: [CommonModule, MaterialModule, FormsModule],
    templateUrl: './lieu-vote-dialog.component.html',
    styleUrl: './lieu-vote-dialog.component.css',
})
export class LieuVoteDialogComponent implements OnInit {


    public lieu_vote: string = '';
    public is_update: boolean = false;
    public item_slug: any;
    public is_loading: boolean = false;


    constructor(
        private _notificationService: NotificationService,
        private _router: Router,
        private _traitement: MainTreatmentsService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<LieuVoteDialogComponent>

    ) { }


    ngOnInit() {

        if (this.data != null) {
            this.is_update = true;
            this.lieu_vote = this.data.lieu_vote;
            this.item_slug= this.data.slug;

        }
    }





    saveLieuVote() {

        if (this.lieu_vote == '') {
            this._notificationService.openSnackBarSimpleError(
                'Le lieu de vote est obligatoire'
            );
            return;
        }

        const data = {
            lieu_vote: this.lieu_vote
        }


        this.is_loading = true;



        this._traitement.saveLieuVote(data).subscribe({

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


    updateLieuVote() {

        if (this.lieu_vote == '') {
            this._notificationService.openSnackBarSimpleError(
                'Le rôle est obligatoire'
            );
            return;
        }

        const data = {
            lieu_vote: this.lieu_vote
        }

        this.is_loading = true;

        this._traitement.updateLieuVote(data, this.item_slug).subscribe({

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
