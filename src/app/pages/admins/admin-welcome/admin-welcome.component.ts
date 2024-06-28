import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import * as XLSX from 'xlsx';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingService } from '@app/services/loadings/loading.service';
import { MaterialModule } from '@app/material-module';
import { MainTreatmentsService } from '@app/services/treatments/main-treatments.service';
import { NotificationService } from '@app/services/notifications/notification.service';
import { MembresFormsDialogComponent } from '@app/dialogs/membres-forms-dialog/membres-forms-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '@app/components/actions/delete/delete.component';
import { TransformDatePipe } from '@app/customer-pipe/transform-date.pipe';
import { FormsModule } from '@angular/forms';
import { UserDataManagerService } from '@app/services/data-managers/user-data/user-data-manager.service';



@Component({
    selector: 'app-admin-welcome',
    standalone: true,
    imports: [
        NgxPaginationModule,
        MaterialModule,
        NgxSpinnerModule,
        TransformDatePipe,
        FormsModule,
    ],
    templateUrl: './admin-welcome.component.html',
    styleUrl: './admin-welcome.component.css',
})
export class AdminWelcomeComponent implements OnInit {


    public membres: number = 0;
    public membres_men: number = 0;
    public membres_women: number = 0;

    public list_membres: any = []; //OK
    public page_length: number = 20;

    public quartiers: any;
    public search: any;

    public p: number = 1;
    public list_quartier: any =  [];
    public list_lieu_vote: any =  [];

    public user_role: string = '';
    public user_id: string = '';

    public lieu_vote:  string = '';


    constructor(
        private _traitement: MainTreatmentsService,
        private _notificationService: NotificationService,
        private _router: Router,
        private _loading: LoadingService,
        private _dialog: MatDialog,
        private _userData: UserDataManagerService,
    ) {}

    ngOnInit(): void {

        this.user_role = this._userData.getUserData().role;
        this.user_id = this._userData.getUserData().user_id;

        console.log(this.user_role)
        this._loading.show_loading();
        setTimeout(() => {
            this.getStatistiqueData();

            if(this.user_role == 'administrateur'){
                this.getMembresList();
            }
            if(this.user_role == 'editeur'){
                this.getMembresListByCustomer(this.user_id);
            }

            this.getLieuVote();
            this.getQuartier();


            this._loading.hide_loading();
        }, 1000);
    }



    getStatistiqueData() {
        this._traitement.getAdminStatistique().subscribe({
            next: (response: any) => {
                //console.log(response);
                this.membres = response.all_membres;
                this.membres_men = response.all_membres_men;
                this.membres_women = response.all_membres_women;

            },
            error: (error: any) => {
                if (error.status == 401) {
                    //return
                    this._notificationService.openSnackBarTokenExpired();
                    localStorage.clear();
                    this._router.navigateByUrl('/');
                }
            },
        });
    }



    searchInTable() {

        this._loading.show_loading();
        this._traitement.filterByQuery(this.search).subscribe({

            next: (response: any) => {
                setTimeout(() => {
                    this.list_membres = response
                    this._loading.hide_loading();
                }, 500);
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

    getQuartier() {
        this._traitement.getQuartier().subscribe({
            next: (response: any) => {
                this.list_quartier = response;
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

    getLieuVote() {
        this._traitement.getLieuVote().subscribe({
            next: (response: any) => {
                this.list_lieu_vote = response;
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

    openMembresDialog() {
        const dialog = this._dialog.open(MembresFormsDialogComponent, {
            panelClass: 'fullscreen-dialog',
        });
        dialog.afterClosed().subscribe({
            next: (val) => {
                if(this.user_role == 'administrateur'){
                    this.getMembresList();
                    this.getStatistiqueData();
                }
                if(this.user_role == 'editeur'){
                    this.getMembresListByCustomer(this.user_id);
                }
            },
        });
    }

    openUpdateMembresDialog(data: any) {
        const dialog = this._dialog.open(MembresFormsDialogComponent, {
            panelClass: 'fullscreen-dialog',
            data: data
        });
        dialog.afterClosed().subscribe({
            next: (val) => {
                if(this.user_role == 'administrateur'){
                    this.getMembresList();
                    this.getStatistiqueData();
                }
                if(this.user_role == 'editeur'){
                    this.getMembresListByCustomer(this.user_id);
                }
            },
        });
    }



    selectQuartiers(event: any) {
        this.quartiers = event.value;
        //console.log(this.quartiers)
        this._loading.show_loading();
        this._traitement.filterByQuartier(this.quartiers).subscribe({

            next: (response: any) => {
                setTimeout(() => {
                    this.list_membres = response
                    //console.log(this.list_employes)
                    this._loading.hide_loading();
                }, 500);
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

    selectLieuVote(event: any) {
        this.lieu_vote = event.value;

        this._loading.show_loading();
        this._traitement.filterByLieuVote(this.lieu_vote).subscribe({

            next: (response: any) => {
                setTimeout(() => {
                    this.list_membres = response

                    this._loading.hide_loading();
                }, 500);
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


    getMembresList() {

        this._traitement.getMembreData().subscribe({

            next: (response: any) => {
                this.list_membres = response
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

    showMembreDetails(slug: string) {
        this._router.navigate(['/data-collector/detail-membres',slug])
    }

    getMembresListByCustomer(user_id: any) {

        this._traitement.getMembreDataByCustomers(user_id).subscribe({

            next: (response: any) => {
                this.list_membres = response
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

                    this.deleteMembresData(slug)

                }
            },
        });
    }


    deleteMembresData(slug: string) {
        this._loading.show_loading();

        this._traitement.destroyMembreData(slug).subscribe({

            next: (response: any) => {
                if (response.code == 200) {
                    setTimeout(() => {
                        this._notificationService.openSnackBarSimpleSuccess(response);
                        this._loading.hide_loading();
                        this.getMembresList();
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




    exportToXLSX() {

        let data = document.querySelector('#table_data');
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);
        /**Generate worBook and add to WorkSheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();

        /** Save to file */
        XLSX.utils.book_append_sheet(wb, ws, 'Feuille 1');

        XLSX.writeFile(wb, 'Membress.xlsx');

    }


}
