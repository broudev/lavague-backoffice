import { Component, OnInit } from '@angular/core';
import { DeleteComponent } from '@app/components/actions/delete/delete.component';
import { LieuVoteDialogComponent } from '../../../dialogs/lieu-vote-dialog/lieu-vote-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MainTreatmentsService } from '@app/services/treatments/main-treatments.service';
import { NotificationService } from '@app/services/notifications/notification.service';
import { LoadingService } from '@app/services/loadings/loading.service';
import { Router, RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from '@app/material-module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { TransformDatePipe } from '@app/customer-pipe/transform-date.pipe';

@Component({
    selector: 'app-admin-lieu-vote',
    standalone: true,
    imports: [
        NgxSpinnerModule,
        MaterialModule,
        NgxPaginationModule,
        FormsModule,
        TransformDatePipe,
        RouterModule
    ],
    templateUrl: './admin-lieu-vote.component.html',
    styleUrl: './admin-lieu-vote.component.css',
})
export class AdminLieuVoteComponent implements OnInit {
    public list_lieu_vote: any = [];
    public p: number = 1;

    constructor(
        private _dialog: MatDialog,
        private _traitement: MainTreatmentsService,
        private _notificationService: NotificationService,
        private _loading: LoadingService,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this.getLieuVoteList();
    }

    openLieuVoteDialog() {
        const dialogRef = this._dialog.open(LieuVoteDialogComponent, {
            width: 'auto',
        });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    this.getLieuVoteList();
                }
            },
        });
    }

    updateLieuVote(data: any) {
        const dialogRef = this._dialog.open(LieuVoteDialogComponent, {
            width: 'auto',
            data,
        });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    this.getLieuVoteList();
                }
            },
        });
    }

    getLieuVoteList() {
        this._loading.show_loading();
        this._traitement.getLieuVote().subscribe({
            next: (response: any) => {
                setTimeout(() => {
                    this.list_lieu_vote = response;
                    this._loading.hide_loading();
                }, 1000);
            },
            error: (error: any) => {
                if (error.status == 401) {
                    this._notificationService.openSnackBarTokenExpired();
                    localStorage.clear();
                    this._router.navigateByUrl('/');
                }
            },
        });
    }

    openDeleteDialog(slug: string) {
        const dialog = this._dialog.open(DeleteComponent, {
            width: 'auto',
        });
        dialog.afterClosed().subscribe({
            next: (val) => {
                if (val == 'confirm') {
                    this.deleteLieuVote(slug);
                }
            },
        });
    }

    deleteLieuVote(slug: string) {
        this._loading.show_loading();

        this._traitement.destroyLieuVote(slug).subscribe({
            next: (response: any) => {
                if (response.code == 200) {
                    setTimeout(() => {
                        this._notificationService.openSnackBarSuccess(response);
                        this.getLieuVoteList();
                        this._loading.hide_loading();
                    }, 1000);
                } else if (response.code == 302 || response.code == 300) {
                    this._loading.hide_loading();
                    this._notificationService.openSnackBarError(response);
                }
            },
            error: (error: any) => {
                if (error.status == 401) {
                    this._notificationService.openSnackBarTokenExpired();
                    localStorage.clear();
                    this._router.navigateByUrl('/');
                }
            },
        });
    }
}
