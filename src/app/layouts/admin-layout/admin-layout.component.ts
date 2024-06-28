import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router, RouterModule, RouterOutlet } from '@angular/router';
import { Location } from '@angular/common';
import { MainTreatmentsService } from '@app/services/treatments/main-treatments.service';
import { UserDataManagerService } from '@app/services/data-managers/user-data/user-data-manager.service';
import { NotificationService } from '@app/services/notifications/notification.service';
import { AuthService } from '@app/services/auth/auth.service';
import { MaterialModule } from '@app/material-module';
import { AvatarModule } from 'ngx-avatars';
import { LoadingService } from '@app/services/loadings/loading.service';

@Component({
    selector: 'app-admin-layout',
    standalone: true,
    imports: [
        RouterOutlet,
        MaterialModule,
        RouterModule,
        AvatarModule
    ],
    templateUrl: './admin-layout.component.html',
    styleUrl: './admin-layout.component.css',
})
export class AdminLayoutComponent implements OnInit {



    public is_admin_sidebar_menu_list: any = [

        {
            id: 1,
            item_name: "Tableau de bord",
            item_icon: "dashboard",
            router: "/data-collector"
        },
        {
            id: 2,
            label: 'Gestions des compptes',
            item_name: "Liste des utilisateurs",
            item_icon: "mark_email_unread",
            router: "/data-collector/users"
        },
        {
            id: 3,
            item_name: "Liste rôles",
            item_icon: "mark_email_unread",
            router: "/data-collector/user-role"
        },
        {
            id: 4,
            label: 'Gestions des membres',
            item_name: "Liste des membres",
            item_icon: "mark_email_unread",
            router: "/data-collector/list-membres"
        },
        {
            id: 5,
            label: 'Paramètre global',
            margin: 'mb-4',
            item_name: "Liste des quartiers",
            item_icon: "format_list_bulleted",
            router: "/data-collector/quartiers"
        },
        {
            id: 6,
            item_name: "Liste des lieux de vote",
            item_icon: "format_list_bulleted_add",
            router: "/data-collector/lieu-vote"
        },
        {
            id: 7,
            item_name: "Liste des fonctions",
            item_icon: "format_list_bulleted_add",
            router: "/data-collector/fonctions"
        },
    ];

    public is_editeur_sidebar_menu_list: any = [

        {
            id: 1,
            item_name: "Tableau de bord",
            item_icon: "dashboard",
            router: "/data-collector"
        },
        {
            id: 2,
            label: 'Gestions des membres',
            item_name: "Liste des membres",
            item_icon: "mark_email_unread",
            router: "/data-collector/list-membres"
        }
    ];

    public current_route: string = '';
    public user_name: string = '';
    public user_role: string = '';
    public user_id: any;
    public photo: string = '';
    public screenWidth!: number;
    public is_opened: boolean = true;


    public type_accounts: string = '';

    constructor(
        private _location: Location,

        private _traitements: MainTreatmentsService,
        private _userData: UserDataManagerService,
        private _notificationService: NotificationService,
        private _router: Router,
        private _loading: LoadingService,


    ) {
        this.screenWidth = window.innerWidth;
        window.onresize = () => {
            // set screenWidth on screen size change
            this.screenWidth = window.innerWidth;
        };
        this._router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.current_route = event.url;
            }
        });

    }

    ngOnInit() {
        this.getUserConnectedData()

    }

    back() {
        this._location.back();
    }





    formatDate(date: any)
    {
        let year = date.toLocaleString("default", { year: "numeric" });
        let month = date.toLocaleString("default", { month: "2-digit" });
        let day = date.toLocaleString("default", { day: "2-digit" });

        return year + "-" + month + "-" + day;
    }

    getUserConnectedData() {
        let data = this._userData.getUserData()

        //console.log(data)
        this.user_name = data.first_name + " " + data.last_name;
        this.user_id = data.user_id;
        this.user_role = data.role;
        this.photo = data.photo;
        this.type_accounts = data.type_accounts
    }


    logOut(id: number) {

        this._loading.show_loading();

        this._traitements.logOut(id).subscribe({

            next: (response: any) =>{


                if(response.code == 200){

                    sessionStorage.clear();
                    localStorage.clear();

                    this._notificationService.openSnackBarSuccess(response);
                    this._loading.hide_loading();

                    this._router.navigate(['/']);


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
