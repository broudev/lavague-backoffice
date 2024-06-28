import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { TransformDatePipe } from '@app/customer-pipe/transform-date.pipe';
import { MaterialModule } from '@app/material-module';
import { UserDataManagerService } from '@app/services/data-managers/user-data/user-data-manager.service';
import { LoadingService } from '@app/services/loadings/loading.service';
import { NotificationService } from '@app/services/notifications/notification.service';
import { MainTreatmentsService } from '@app/services/treatments/main-treatments.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
    selector: 'app-detail-membres',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        NgxSpinnerModule,
        NgxPaginationModule,
        TransformDatePipe,
        RouterModule,
    ],
    templateUrl: './detail-membres.component.html',
    styleUrl: './detail-membres.component.css',
})
export class DetailMembresComponent implements OnInit {
    public first_name: string = ''; //OK
    public last_name: string = ''; //OK
    public phone_number: string = '+225'; // OK;
    public genre: any; //OK;
    public photo!: File;

    //public nationalite: string = '';
    public date_naissance: any = new Date(); //OK ;
    //public lieu_naissance: string = ''; // OK ;
    public num_carte_identite: string = '';
    public num_carte_electeur: string = '';
    public piece: any;

    public created_at: Date = new Date();

    public quartiers: any; // OK ;
    public montants: number = 0; // OK ;
    public lieu_vote: any; // OK ;
    public fonctions: any; // OK ;
    public profession: string = ''; // OK ;
    public code_unique: string = '';

    public item_slug: any;
    public is_print_card: boolean = false;
    public is_print: boolean = false;

    constructor(
        private _traitement: MainTreatmentsService,
        private _notificationService: NotificationService,
        private _loading: LoadingService,
        private _router_activated: ActivatedRoute,
        private _router: Router,
        private _location: Location
    ) {}

    ngOnInit(): void {
        this.item_slug = this._router_activated.snapshot.paramMap.get('slug');

        this._traitement.getMembreDetail(this.item_slug).subscribe({
            next: (response: any) => {
                console.log(response);
                this.code_unique = response.code_unique;
                this.first_name = response.first_name;
                this.last_name = response.last_name;
                this.profession = response.profession;
                this.fonctions = response.fonctions;
                this.phone_number = response.phone_number;
                this.num_carte_identite = response.num_carte_identite;
                this.num_carte_electeur = response.num_carte_electeur;
                this.item_slug = response.slug;
                this.genre = response.genre;
                this.piece = response.type_piece;
                this.photo = response.photo;
                this.created_at = new Date(response.created_at);
                this.quartiers = response.quartiers;
                this.lieu_vote = response.lieu_vote;


                this.quartiers = response.quartiers;
                this.date_naissance = new Date(response.date_naissance);
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

    goToPrintCard() {
        this._loading.show_loading();
        localStorage.setItem('is_print', 'yes');
        setTimeout(() => {
            this.is_print_card = true;
            this._loading.hide_loading();
        }, 1000);
    }

    returnAfterPrintCard() {
        this._loading.show_loading();
        localStorage.removeItem('is_print');
        setTimeout(() => {
            this.is_print_card = false;
            this._loading.hide_loading();
        }, 1000);
    }

    return() {
        this._location.back();
    }

    print() {
        this.is_print = true;
        setTimeout(() => {
            let printContents: any =
                document.querySelector('#card-content')?.innerHTML;
            let originalContents = document.body.innerHTML;
            document.body.innerHTML = printContents;
            window.print();
            document.body.innerHTML = originalContents;
            window.addEventListener('afterprint', () => self.close);
            setTimeout(() => {
                window.location.reload();
            }, 500);
        }, 1000);
    }
}
