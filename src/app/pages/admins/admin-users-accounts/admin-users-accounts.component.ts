import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { NgxSpinnerModule } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '@app/material-module';
import { TransformDatePipe } from '@app/customer-pipe/transform-date.pipe';
import { MainTreatmentsService } from '@app/services/treatments/main-treatments.service';
import { NotificationService } from '@app/services/notifications/notification.service';
import { LoadingService } from '@app/services/loadings/loading.service';
import { CreateUsersComponent } from '@app/dialogs/users/create-users/create-users.component';
import { DeleteComponent } from '@app/components/actions/delete/delete.component';
import { AvatarModule } from 'ngx-avatars';

@Component({
    selector: 'app-admin-users-accounts',
    standalone: true,
    imports: [
        NgxSpinnerModule,
        MaterialModule,
        NgxPaginationModule,
        FormsModule,
        TransformDatePipe,
        RouterModule,
        AvatarModule
    ],
    templateUrl: './admin-users-accounts.component.html',
    styleUrl: './admin-users-accounts.component.css',
})
export class AdminUsersAccountsComponent implements OnInit {

    public list_users_accounts: any = [];
    public list_employees_accounts: any = [];
    public p: number = 1;

    public list_roles: any = [];
    public type_accounts: any;
    public list_type_accounts: any = [

        {
            id: 1,
            type: "Gestion Capital humain",
            type_accounts: "ressource_humaine"
        },
        {
            id: 2,
            type: "Gestion de stock",
            type_accounts: "gestion_stock"
        },
        {
            id: 3,
            type: "Employé",
            type_accounts: "employe"
        },
        {
            id: 4,
            type: "Gestion de courier",
            type_accounts: "gestion_courier"
        },
        {
            id: 4,
            type: "Sécrétariat",
            type_accounts: "secretariat"
        }
    ];


    constructor(
        private _dialog: MatDialog,
        private _traitement: MainTreatmentsService,
        private _notificationService: NotificationService,
        private _loading: LoadingService,
        private _router: Router
    ){}


    ngOnInit() {
        this._loading.show_loading();
        this.getUserAccountsList();
    }




    openUsersDialog()
    {
        const dialogRef = this._dialog.open(CreateUsersComponent, { width: 'auto' });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    this.getUserAccountsList();
                }
            },
        });
    }


    updateUsers(data: any)
    {


        const dialogRef = this._dialog.open(CreateUsersComponent,
            {
                width: 'auto',
                data
            }
        );
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    this.getUserAccountsList();
                }
            },
        });

    }


    openDeleDialog(slug: string) {
        const dialog = this._dialog.open(DeleteComponent, {
            width: 'auto',
        });
        dialog.afterClosed().subscribe({
            next: (val) => {
                if (val == "confirm") {

                    this.deleteUsers(slug)

                }
            },
        });
    }


    deleteUsers(slug: string)
    {
        this._loading.show_loading();

        this._traitement.deleteUsers(slug).subscribe({

            next: (response: any) => {
                if (response.code == 200) {
                    setTimeout(() => {
                        this._notificationService.openSnackBarSuccess(response);
                        this._loading.hide_loading();
                        this.getUserAccountsList();
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



    getUserAccountsList()
    {
        this._loading.show_loading();
        this._traitement.getUsers().subscribe({

            next: (response: any) => {
                //console.log(response)
                setTimeout(() => {
                    this.list_users_accounts = response
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





    enableOrDisableAccount(slug: string){

        this._loading.show_loading();
		this._traitement.statutAction(slug).subscribe({

            next: (response: any) => {
                if (response.code == 200) {
                    this._notificationService.openSnackBarSuccess(response);
                    setTimeout(() => {
                        this.getUserAccountsList();

                        this._loading.hide_loading();
                    }, 2000);
                } else if (response.code == 302) {
                    this._notificationService.openSnackBarError(response);
                }
            },
            error: (error: any) => {
                if(error.status == 401){
                    this._notificationService.openSnackBarTokenExpired();
                    localStorage.clear();
                    this._router.navigateByUrl('/');
                }
            }


		})

	}







}
