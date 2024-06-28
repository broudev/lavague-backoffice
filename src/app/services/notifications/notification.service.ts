import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    durations: number = 36000


    constructor(private _snackBar: MatSnackBar) { }



    openSnackBarSuccess(notification: any) {

        return this._snackBar.open(notification.message, notification.status, {
            duration: this.durations,
            panelClass: ['success-snackbar'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }

    openSnackBarInfo(notification: any) {

        return this._snackBar.open(notification.message, notification.status, {
            duration: this.durations,
            panelClass: ['info-snackbar'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }

    openSnackBarError(notification: any) {

        return this._snackBar.open(notification.message, notification.status, {
            duration: this.durations,
            panelClass: ['error-snackbar'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }


    openSnackBarSimpleError(message: string) {

        return this._snackBar.open(message, 'Erreur', {
            duration: this.durations,
            panelClass: ['error-snackbar'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }


    openSnackBarSimpleSuccess(message: string) {

        return this._snackBar.open(message, 'Info', {
            duration: this.durations,
            panelClass: ['success-snackbar'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }


    openSnackBarTokenExpired() {

        return this._snackBar.open("Session expirée ! Merci de vous reconnecter", "Erreur", {
            duration: this.durations,
            panelClass: ['error-snackbar'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }
}
