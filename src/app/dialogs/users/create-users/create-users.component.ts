import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '@app/services/notifications/notification.service';
import { MainTreatmentsService } from '@app/services/treatments/main-treatments.service';
import { MaterialModule } from '@app/material-module';


@Component({
    selector: 'app-create-users',
    standalone: true,
    imports: [CommonModule, MaterialModule, FormsModule],
    templateUrl: './create-users.component.html',
    styleUrls: ['./create-users.component.css'],
})
export class CreateUsersComponent implements OnInit {
    public first_name: string = '';
    public last_name: string = '';
    public phone_number: string = '';

    public password: string = '';
    public role: any;
    public hide: boolean = true;
    public is_update: boolean = false;
    public item_slug: any;


    public selectedOption: any;

    public confirm_password: string = '';
    public list_roles: any = [];

    public is_loading: boolean = false;

    constructor(
        private _notificationService: NotificationService,
        private _router: Router,
        private _traitement: MainTreatmentsService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<CreateUsersComponent>
    ) {}

    ngOnInit() {
        if (this.data != null) {
            this.is_update = true;
            this.first_name = this.data.first_name;
            this.last_name = this.data.last_name;
            this.phone_number = this.data.username;
            this.item_slug = this.data.slug;
            this.selectedOption = this.data.role_id;
        }
        this.getRole();
    }

    selectRole(event: any) {
        this.role = event.value;
    }


    getRole() {
        this._traitement.getRoles().subscribe({
            next: (response: any) => {
                this.list_roles = response;
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


    saveUsers() {
        if (this.first_name == '') {
            this._notificationService.openSnackBarSimpleError(
                'Le nom est obligatoire'
            );
            return;
        }

        if (this.last_name == '') {
            this._notificationService.openSnackBarSimpleError(
                'Le prénom est obligatoire'
            );
            return;
        }

        if (this.phone_number == '' || this.phone_number.length < 10) {
            this._notificationService.openSnackBarSimpleError(
                "L'adresse email est obligatoire"
            );
            return;
        }

        const formData: FormData = new FormData();
        formData.append('first_name', this.first_name);
        formData.append('last_name', this.last_name);
        formData.append('phone_number', this.phone_number);
        formData.append('role', this.role);
        formData.append('password',this.password );


        this.is_loading = true;

        this._traitement.saveUsers(formData).subscribe({
            next: (response: any) => {
                //.log(response)
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
            },
        });
    }

    updateUsers() {
        if (this.first_name == '') {
            this._notificationService.openSnackBarSimpleError(
                'Le nom est obligatoire'
            );
            return;
        }

        if (this.last_name == '') {
            this._notificationService.openSnackBarSimpleError(
                'Le prénom est obligatoire'
            );
            return;
        }

        if (this.phone_number == '') {
            this._notificationService.openSnackBarSimpleError(
                "Le numéro de téléphone est obligatoire"
            );
            return;
        }

        const formData: FormData = new FormData();
        formData.append('first_name', this.first_name);
        formData.append('last_name', this.last_name);
        formData.append('phone_number', this.phone_number);
        formData.append('role',this.role == undefined ? this.selectedOption : this.role);


        this.is_loading = true;

        this._traitement.updateUsers(formData, this.item_slug).subscribe({
            next: (response: any) => {
                console.log(response);
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
            },
        });
    }
}
