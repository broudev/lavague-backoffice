import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import packageJson from '../../../../package.json';
import { RecaptchaModule } from "ng-recaptcha";
import { CookieManagerService } from '@app/services/data-managers/cookies/cookie-manager.service';
import { StorageManagerService } from '@app/services/data-managers/storage/storage-manager.service';
import { NotificationService } from '@app/services/notifications/notification.service';
import { MaterialModule } from '@app/material-module';
import { AuthService } from '@app/services/auth/auth.service';
import { ForgetPasswordComponent } from '@app/dialogs/users/forget-password/forget-password.component';

@Component({
    selector: 'app-auths',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        RecaptchaModule
    ],
    templateUrl: './auths.component.html',
    styleUrl: './auths.component.css',
})
export class AuthsComponent implements OnInit {

    // var recaptcha
    public siteKey: string = '6Ldxy9kpAAAAAHYU54OJVKCFv72reGfapwonMVXJ';
    public token: string = '6Ldxy9kpAAAAALNbkSdboHKD3Up45V0hyX1FxdaG';


    public hide: boolean = true;
    public new_date: Date = new Date();

    public is_loading: boolean = false;

    public code_autorisation: string = '';
    public code_owners: string = '';
    //Login attribute
    public username: string = '';
    public password: string = '';

    //variable to check app version
    public version: string = '';
    public screenWidth!: number;
    public recaptcha_response: any = null;

    constructor(
        private _authService: AuthService,
        private _router: Router,
        private _dialog: MatDialog,
        private _cookieService: CookieManagerService,
        private _storageService: StorageManagerService,
        private _notificationService: NotificationService,
    ) {
        this.screenWidth = window.innerWidth;
        window.onresize = () => {
            this.screenWidth = window.innerWidth;
        };
    }

    ngOnInit(): void {

        this.version = packageJson.version
    }
    //ARIH59AT
    connectAdmin() {

        const data = {
            username: this.username,
            password: this.password
        }

        //console.log(data);
        this.is_loading = true;

        this._authService.connectAdmin(data).subscribe({

            next: (response: any) => {

                //return
                if (response.code == 200) {

                    setTimeout(() => {

                        this._cookieService.setTokenToCookie(response.token);

                        this._cookieService.setEmailToCookie(response.users.accounts_info.username);

                        this._storageService.setTokenToStorage(response.token);

                        this._storageService.setDataToStorage(response.users.accounts_info);
                        this._storageService.setIsLoggedToStorage('true')

                        this.is_loading = false;


                        this._notificationService.openSnackBarSuccess(response);


                        this.redirectTo()

                    }, 1000)
                } else if (response.code == 302 || response.code == 300 || response.code == 500) {
                    this._notificationService.openSnackBarError(response);
                    this.is_loading = false;
                }

            },
            error: (error: any) => {
                if (error.status == 401) {
                    this._notificationService.openSnackBarTokenExpired();
                    localStorage.clear();
                    this._router.navigateByUrl('/');
                    //window.location.reload();
                }
            }
        });

    }



    // REDIRECT AFTER LOGGED
    redirectTo()
    {
        this._router.navigate(['/data-collector'])
    }


    openForgetPasswordDialog(enterAnimationDuration: string, exitAnimationDuration: string) {

        const dialogRef = this._dialog.open(ForgetPasswordComponent, {
            width: 'auto',
            enterAnimationDuration,
            exitAnimationDuration,
        });
    }



    resolved(captchaResponse: any) {
        this.recaptcha_response = captchaResponse;
    }
}
