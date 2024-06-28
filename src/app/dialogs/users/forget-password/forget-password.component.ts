import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@app/services/auth/auth.service';
import { NotificationService } from '@app/services/notifications/notification.service';
import { MaterialModule } from '@app/material-module';

@Component({
    selector: 'app-forget-password',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule
    ],
    templateUrl: './forget-password.component.html',
    styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent implements OnInit {

    //Login attribute
    public username: string = '';
    public password: string = '';
    public hide: boolean = true;
    public is_loading: boolean = false;
    public is_user_account_founded: boolean = false;

    constructor(
        private _authService: AuthService,
        private _notificationService: NotificationService,
        private _router: Router,
        private _dialogRef: MatDialogRef<ForgetPasswordComponent>,
    ){}

    ngOnInit() {

    }


    checkUserAccounts() {

        this.is_loading = true;
        const data = {
            username: this.username
        }
        this._authService.checkUserAccounts(data).subscribe({

            next: (response: any) => {
                //.log(response)
                if (response.code == 200) {
                    this._notificationService.openSnackBarSuccess(response);
                    this.is_user_account_founded = !this.is_user_account_founded;
                    setTimeout(() => {
                        this.is_loading = false;
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

    backNow() {
        this.is_user_account_founded = !this.is_user_account_founded;
    }


    updateUserPassword() {

        this.is_loading = true;
        const data = {
            username: this.username,
            password: this.password
        }

        this._authService.updateUserPassword(data).subscribe({

            next: (response: any) => {
                //.log(response)
                if (response.code == 200) {
                    this._notificationService.openSnackBarSuccess(response);

                    setTimeout(() => {
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
