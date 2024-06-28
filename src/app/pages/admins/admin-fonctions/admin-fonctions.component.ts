import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { DeleteComponent } from '@app/components/actions/delete/delete.component';
import { TransformDatePipe } from '@app/customer-pipe/transform-date.pipe';
import { FonctionDialogComponent } from '@app/dialogs/fonction-dialog/fonction-dialog.component';
import { MaterialModule } from '@app/material-module';
import { LoadingService } from '@app/services/loadings/loading.service';
import { NotificationService } from '@app/services/notifications/notification.service';
import { MainTreatmentsService } from '@app/services/treatments/main-treatments.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
    selector: 'app-admin-fonctions',
    standalone: true,
    imports: [
        NgxSpinnerModule,
        MaterialModule,
        NgxPaginationModule,
        FormsModule,
        TransformDatePipe,
        RouterModule
    ],
    templateUrl: './admin-fonctions.component.html',
    styleUrl: './admin-fonctions.component.css',
})
export class AdminFonctionsComponent implements OnInit {

    public list_fonction: any = [];
    public p: number = 1;


    constructor(
        private _dialog: MatDialog,
        private _traitement: MainTreatmentsService,
        private _loading: LoadingService,
        private _router: Router,
        private _notificationService: NotificationService,
    ) {}

    ngOnInit(): void {
        this.getFonctionList();
    }

    openFonctionDialog() {
        const dialogRef = this._dialog.open(FonctionDialogComponent, { width: 'auto' });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    this.getFonctionList();
                }
            },
        });
    }


    updateFonction(data: any) {


        const dialogRef = this._dialog.open(FonctionDialogComponent,
            {
                width: 'auto',
                data
            }
        );
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    this.getFonctionList();
                }
            },
        });

    }




    getFonctionList() {

        this._loading.show_loading();
        this._traitement.getFonctions().subscribe({

            next: (response: any) => {
                setTimeout(() => {
                    this.list_fonction = response
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

                    this.deleteFonction(slug)

                }
            },
        });
    }


    deleteFonction(slug: string) {
        this._loading.show_loading();

        this._traitement.destroyFonctions(slug).subscribe({

            next: (response: any) => {
                if (response.code == 200) {
                    setTimeout(() => {
                        this._notificationService.openSnackBarSuccess(response);
                        this._loading.hide_loading();
                        this.getFonctionList();
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
