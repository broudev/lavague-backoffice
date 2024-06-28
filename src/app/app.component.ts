import { HttpClientModule } from '@angular/common/http';
import { Component, LOCALE_ID } from '@angular/core';
import { MatDialogClose } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { NotificationService } from '@app/services/notifications/notification.service';
import { registerLocaleData } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs';
import * as fr from '@angular/common/locales/fr';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        MatDialogClose,
        AuthLayoutComponent,
        AdminLayoutComponent,
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'fr-FR' },
        HttpClientModule
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {
    title = 'Membres';

    public status!: string;

    constructor(
        private _router: Router,
        private _titleService: Title,
        private _activatedRoute: ActivatedRoute,
        private _notificationService: NotificationService,
    ){
        registerLocaleData(fr.default);
    }

    ngOnInit(): void {
        this._router.events.pipe(
            filter(event => event instanceof NavigationEnd),
        ).subscribe(() => {

            let rt = this.getChild(this._activatedRoute)

            rt.data.subscribe((data: any) => {
                this._titleService.setTitle(data.title);
            })
        })
        //console.log("Blog layout on appCom ngOnInit")

        window.addEventListener('offline', () => {
            this.status = 'offline';
            this.ShowOffLineAlert();
        })

        window.addEventListener('online', () => {
            this.status = 'online';
            this.ShowOnLineAlert();
        })


    }


    getChild(activatedRoute: ActivatedRoute): any {
        if (activatedRoute.firstChild) {
            return this.getChild(activatedRoute.firstChild);
        } else {
            return activatedRoute;
        }

    }




    ShowOffLineAlert(){
        this._notificationService.openSnackBarSimpleError('Vous êtes hors connexion');
    }

    ShowOnLineAlert(){
        this._notificationService.openSnackBarSimpleSuccess('Connexion rétablie');
    }
}
