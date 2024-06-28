import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { DeleteComponent } from '@app/components/actions/delete/delete.component';
import { TransformDatePipe } from '@app/customer-pipe/transform-date.pipe';
import { QuartiersDialogComponent } from '@app/dialogs/quartiers-dialog/quartiers-dialog.component';
import { MaterialModule } from '@app/material-module';
import { LoadingService } from '@app/services/loadings/loading.service';
import { NotificationService } from '@app/services/notifications/notification.service';
import { MainTreatmentsService } from '@app/services/treatments/main-treatments.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
    selector: 'app-admin-quartiers',
    standalone: true,
    imports: [
        NgxSpinnerModule,
        MaterialModule,
        NgxPaginationModule,
        FormsModule,
        TransformDatePipe,
        RouterModule
    ],
    templateUrl: './admin-quartiers.component.html',
    styleUrl: './admin-quartiers.component.css',
})
export class AdminQuartiersComponent implements OnInit {


    public list_quartiers: any = [];
    public p: number = 1;

    constructor(
        private _dialog: MatDialog,
        private _traitement: MainTreatmentsService,
        private _notificationService: NotificationService,
        private _loading: LoadingService,
        private _router: Router
    ){}


    ngOnInit(): void {
        this.getQuartierList();
    }

    openQuartierDialog() {
        const dialogRef = this._dialog.open(QuartiersDialogComponent, { width: 'auto' });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    this.getQuartierList();
                }
            },
        });
    }


    updateQuartier(data: any) {


        const dialogRef = this._dialog.open(QuartiersDialogComponent,
            {
                width: 'auto',
                data
            }
        );
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    this.getQuartierList();
                }
            },
        });

    }




    getQuartierList() {

        this._loading.show_loading();
        this._traitement.getQuartier().subscribe({

            next: (response: any) => {
                setTimeout(() => {
                    this.list_quartiers = response
                    this._loading.hide_loading();
                }, 1000);
            },
            error: (error: any) => {
                if (error.status == 401) {
                    this._notificationService.openSnackBarTokenExpired();
                    localStorage.clear();
                    this._router.navigateByUrl('/');

                }
            }
        });
    }


    openDeleDialog(slug: string) {
        const dialog = this._dialog.open(DeleteComponent, {
            width: 'auto',
        });
        dialog.afterClosed().subscribe({
            next: (val) => {
                if (val == "confirm") {

                    this.deleteRole(slug)

                }
            },
        });
    }


    deleteRole(slug: string) {
        this._loading.show_loading();

        this._traitement.destroyQuartier(slug).subscribe({

            next: (response: any) => {
                if (response.code == 200) {
                    setTimeout(() => {
                        this._notificationService.openSnackBarSuccess(response);
                        this.getQuartierList();
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
            }
        });

    }
}
