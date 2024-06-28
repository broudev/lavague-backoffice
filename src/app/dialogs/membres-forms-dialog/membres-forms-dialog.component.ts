import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MaterialModule } from '@app/material-module';
import { UserDataManagerService } from '@app/services/data-managers/user-data/user-data-manager.service';
import { NotificationService } from '@app/services/notifications/notification.service';
import { MainTreatmentsService } from '@app/services/treatments/main-treatments.service';
import { PhoneNumberUtil } from 'google-libphonenumber';


@Component({
    selector: 'app-membres-forms-dialog',
    standalone: true,
    imports: [CommonModule, MaterialModule, FormsModule],
    templateUrl: './membres-forms-dialog.component.html',
    styleUrl: './membres-forms-dialog.component.css',
})
export class MembresFormsDialogComponent implements OnInit {

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

    public quartiers: any ; // OK ;
    public montants: number  = 0; // OK ;
    public lieu_vote: any ; // OK ;
    public fonctions: any ; // OK ;
    public profession: string = ''; // OK ;

    public selectedGenreOption: any;
    public selectedPieceOption: any;

    public selectedQuartierOption: any;
    public selectedLieuVoteOption: any;
    public selectedFonctionsOption: any;


    public is_update: boolean = false;
    public item_slug: any;

    public list_quartier: any =  [];
    public list_lieu_vote: any =  [];
    public list_fonction: any =  [];


    public list_genre: any = [
        { id: 1, genre: 'Homme' },
        { id: 2, genre: 'Femme' },
    ];

    public list_piece: any = [
        { id: 1, piece: "Carte Nationale d'Identité" },
        { id: 2, piece: 'PassePort' },
        { id: 2, piece: 'Extrait de naissance' },
        { id: 2, piece: 'Permis de conduire' },
        { id: 3, piece: "Attestation d'identité" },
        { id: 4, piece: "Certificat de nationalité" },
    ];

    public is_loading: boolean = false;

    constructor(
        private _notificationService: NotificationService,
        private _traitement: MainTreatmentsService,
        private _router: Router,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<MembresFormsDialogComponent>,
        private _userData: UserDataManagerService,
    ) {}

    ngOnInit(): void {
        if (this.data != null) {
            this.is_update = true;
            this.first_name = this.data.first_name;
            this.last_name = this.data.last_name;
            this.profession = this.data.profession;
            this.phone_number = this.data.phone_number;
            this.num_carte_identite = this.data.num_carte_identite;
            this.num_carte_electeur = this.data.num_carte_electeur;
            this.item_slug = this.data.slug;
            this.selectedGenreOption = this.data.genre;
            this.selectedPieceOption = this.data.type_piece;

            this.selectedQuartierOption = this.data.quartiers;
            this.selectedLieuVoteOption = this.data.lieu_vote;
            this.selectedFonctionsOption = this.data.fonctions_id;

            this.quartiers = this.data.quartiers;
            this.date_naissance = new Date(this.data.date_naissance);

            this.checkFonctionMontant(this.data.fonctions_id);
            //console.log(this.data)
        }

        this.getLieuVote();
        this.getQuartier();
        this.getFonctions();
    }

    // REGISTERED SELECTEUR INFORMATION

    selectGenre(event: any) {
        this.genre = event.value;
    }

    selectFonctions(event: any) {
        this.fonctions = event.value;

        this.checkFonctionMontant(this.fonctions)
    }

    selectPiece(event: any) {
        this.piece = event.value;
    }


    selectQuartier(event: any) {
        this.quartiers = event.value;
    }

    selectLieuVote(event: any) {
        this.lieu_vote = event.value;
    }

    uploadFile(e: any) {
        this.photo = e.target.files[0];
    }


    checkFonctionMontant(fonction: number) {

        this._traitement.getFonctionsMontant(fonction).subscribe({
            next: (response: any) => {
                this.montants = response;
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

    validateNumber(phoneNumber: string): boolean {
        const phoneNumberUtil = PhoneNumberUtil.getInstance();

        try {
            const parsedNumber = phoneNumberUtil.parse(phoneNumber, 'ZZ');
            return phoneNumberUtil.isValidNumber(parsedNumber);
        } catch (error) {
            return false; // Invalid phone number format
        }
    }

    saveMembreData() {

        try {
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
            if (this.genre == '') {
                this._notificationService.openSnackBarSimpleError(
                    'Le genre est obligatoire'
                );
                return;
            }
            if (this.date_naissance == '') {
                this._notificationService.openSnackBarSimpleError(
                    'La date de naissance est obligatoire'
                );
                return;
            }

            if(this.validateNumber(this.phone_number) == false || this.phone_number == '') {
                this._notificationService.openSnackBarSimpleError(
                    'Le format du numéro de téléphone est invalide ou obligatoire ! Ex: +2250000000000'
                );
                return;
            }



            const formData: FormData = new FormData();
            formData.append('first_name', this.first_name);
            formData.append('last_name', this.last_name);
            formData.append('profession', this.profession);
            formData.append('phone_number', this.phone_number);
            formData.append('user_id', this._userData.getUserData().user_id );

            formData.append(
                'genre',
                this.genre != undefined ? this.genre : ""
            );

            formData.append('date_naissance', this.formatDate(this.date_naissance));
            formData.append('lieu_vote', this.lieu_vote != undefined ? this.lieu_vote : "" );
            formData.append('quartiers', this.quartiers != undefined ? this.quartiers : "" );
            formData.append('fonctions', this.fonctions != undefined ? this.fonctions : "" );

            formData.append(
                'type_piece',
                this.piece != undefined ? this.selectedPieceOption : this.piece
            );
            formData.append('num_carte_identite', this.num_carte_identite);
            formData.append('num_carte_electeur', this.num_carte_electeur);
            formData.append(
                'photo',
                this.photo != undefined ? this.photo : ''
            );

            this.is_loading = true;

            this._traitement.saveMembreData(formData).subscribe({
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
        } catch (error) {
            console.log(error);
        }

    }



    updateMembreData() {

        try {
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
            if (this.genre == '') {
                this._notificationService.openSnackBarSimpleError(
                    'Le genre est obligatoire'
                );
                return;
            }
            if (this.date_naissance == '') {
                this._notificationService.openSnackBarSimpleError(
                    'La date de naissance est obligatoire'
                );
                return;
            }




            if(this.validateNumber(this.phone_number) == false || this.phone_number == '') {
                this._notificationService.openSnackBarSimpleError(
                    'Le format du numéro de téléphone est invalide ou obligatoire ! Ex: +2250000000000'
                );
                return;
            }



            const formData: FormData = new FormData();
            formData.append('first_name', this.first_name);
            formData.append('last_name', this.last_name);
            formData.append('profession', this.profession);
            formData.append('phone_number', this.phone_number);
            formData.append('user_id', this._userData.getUserData().user_id );

            formData.append(
                'genre',
                this.genre == undefined ? this.selectedGenreOption : this.genre
            );

            formData.append('date_naissance', this.formatDate(this.date_naissance));
            formData.append('lieu_vote', this.lieu_vote == undefined ? this.selectedLieuVoteOption : this.lieu_vote);
            formData.append('quartiers', this.quartiers === undefined ? this.selectedQuartierOption : this.quartiers);
            formData.append('fonctions', this.fonctions === undefined ? this.selectedFonctionsOption : this.fonctions);

            formData.append(
                'type_piece',
                this.piece == undefined ? this.selectedPieceOption : this.piece
            );
            formData.append('num_carte_identite', this.num_carte_identite);
            formData.append('num_carte_electeur', this.num_carte_electeur);
            formData.append(
                'photo',
                this.photo == undefined ? " " :this.photo
            );

            this.is_loading = true;

            this._traitement.updateMembreData(formData, this.item_slug).subscribe({
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
        } catch (error) {
            console.log(error);
        }

    }

    // FORMAT DATE FUNCTION

    formatDate(date: any) {
        let year = date.toLocaleString('default', { year: 'numeric' });
        let month = date.toLocaleString('default', { month: '2-digit' });
        let day = date.toLocaleString('default', { day: '2-digit' });

        return year + '-' + month + '-' + day;
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

    getFonctions() {
        this._traitement.getFonctions().subscribe({
            next: (response: any) => {
                this.list_fonction = response;
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

}
