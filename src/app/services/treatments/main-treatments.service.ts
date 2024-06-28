import { Injectable } from '@angular/core';
import { EnvironmentsService } from '../environments.service';
import { HttpClient } from '@angular/common/http';
import { StorageManagerService } from '../data-managers/storage/storage-manager.service';

@Injectable({
    providedIn: 'root',
})
export class MainTreatmentsService {


    public headers: any;
    constructor(
        private _api_url: EnvironmentsService,
        private _http: HttpClient,
        private _localStorage: StorageManagerService
    ) {

    }

    getToken = () => {
        const tokens = this._localStorage.getTokenToStorage();
        this. headers = { headers: { 'Authorization': 'Bearer ' + tokens }};

        return this.headers;
    }

    /**
     *
     * @param data
     * @returns
     */

    // MEMBRES

    saveMembreData = (data: any) => {
        const url = this._api_url.apiUrl + 'store_membres';
        return this._http.post(url, data, this.getToken());
    }
    getMembreData = () => {
        const url = this._api_url.apiUrl + 'get_membres';
        return this._http.get(url,this.getToken());
    }

    getMembreDataByCustomers = (user_id: number) => {
        const url = this._api_url.apiUrl + 'get_membres_by_customer/' + user_id;
        return this._http.get(url,this.getToken());
    }

    getMembreDetail = (slug: string) => {
        const url = this._api_url.apiUrl + 'show_membres/' + slug;
        return this._http.get(url,this.getToken());
    }

    updateMembreData = (data: any ,slug: string) => {
        const url = this._api_url.apiUrl + 'update_membres/' + slug;
        return this._http.post(url, data, this.getToken());
    }

    destroyMembreData = (slug: string) => {
        const url = this._api_url.apiUrl + 'delete_membres/' + slug;
        return this._http.get(url, this.getToken());
    }


    // MANAGE ACCOUNT

    /**
        ============================ CREATE ADMIN ACCOUNTS ===========================
    */
    saveUsers = (data: any) => {
        const url = this._api_url.apiUrl + 'store_admin';
        return this._http.post(url, data, this.getToken());
    }

    updateUsers = (data: any, slug: string) => {
        const url = this._api_url.apiUrl + 'update_admin/' + slug;
        return this._http.post(url, data, this.getToken());
    }
    deleteUsers = (slug: string) => {
        const url = this._api_url.apiUrl + 'delete_admin/' + slug;
        return this._http.get(url,this.getToken());
    }
    getUsers = () => {
        const url = this._api_url.apiUrl + 'get_admin';
        return this._http.get(url,this.getToken());
    }

    statutAction = (slug: string) => {
        const url = this._api_url.apiUrl + 'enable_or_disable_admin_account/' + slug ;
        return this._http.get(url, this.getToken());
    }
    /**
        ============================ END CREATE ADMIN ACCOUNTS ===========================
    */



    // ADD ROLE 💚
    saveRole = (data: any) => {
        const url = this._api_url.apiUrl + 'store_role';
        return this._http.post(url, data,this.getToken());
    }
    updateRole = (data: any, slug: string) => {
        const url = this._api_url.apiUrl + 'update_role/'+slug;
        return this._http.post(url, data,this.getToken());
    }
    destroyRole = (slug: string) => {
        const url = this._api_url.apiUrl + 'destroy_role/'+slug;
        return this._http.get(url,this.getToken());
    }

    getRoles = () => {
        const url = this._api_url.apiUrl + 'get_role';
        return this._http.get(url,this.getToken());
    }
    // END ROLE



    // ADD QUARTIER 💚
    saveQuartier = (data: any) => {
        const url = this._api_url.apiUrl + 'store_quartiers';
        return this._http.post(url, data,this.getToken());
    }
    updateQuartier = (data: any, slug: string) => {
        const url = this._api_url.apiUrl + 'update_quartiers/'+slug;
        return this._http.post(url, data,this.getToken());
    }
    destroyQuartier = (slug: string) => {
        const url = this._api_url.apiUrl + 'delete_quartiers/'+slug;
        return this._http.get(url,this.getToken());
    }

    getQuartier = () => {
        const url = this._api_url.apiUrl + 'get_quartiers';
        return this._http.get(url,this.getToken());
    }
    // END QUARTIER


    // ADD LIEU DE VOTE 💚
    saveLieuVote = (data: any) => {
        const url = this._api_url.apiUrl + 'store_lieu_vote';
        return this._http.post(url, data,this.getToken());
    }
    updateLieuVote = (data: any, slug: string) => {
        const url = this._api_url.apiUrl + 'update_lieu_vote/'+slug;
        return this._http.post(url, data,this.getToken());
    }
    destroyLieuVote = (slug: string) => {
        const url = this._api_url.apiUrl + 'delete_lieu_vote/'+slug;
        return this._http.get(url,this.getToken());
    }

    getLieuVote = () => {
        const url = this._api_url.apiUrl + 'get_lieu_vote';
        return this._http.get(url,this.getToken());
    }
    // END LIEU DE VOTE


    // ADD FONCTIONS 💚
    saveFonctions = (data: any) => {
        const url = this._api_url.apiUrl + 'store_fonctions';
        return this._http.post(url, data,this.getToken());
    }
    updateFonctions = (data: any, slug: string) => {
        const url = this._api_url.apiUrl + 'update_fonctions/'+slug;
        return this._http.post(url, data,this.getToken());
    }
    destroyFonctions = (slug: string) => {
        const url = this._api_url.apiUrl + 'delete_fonctions/'+slug;
        return this._http.get(url,this.getToken());
    }

    getFonctions = () => {
        const url = this._api_url.apiUrl + 'get_fonctions';
        return this._http.get(url,this.getToken());
    }

    getFonctionsMontant = (fonction: number) => {
        const url = this._api_url.apiUrl + 'get_fonctions_montant/'+fonction;
        return this._http.get(url,this.getToken());
    }
    // END FONCTIONS





    getStatistiqueData = () => {
        const url = this._api_url.apiUrl + 'get_current_statistique';
        return this._http.get(url);
    }


    logOut = (id: number) => {
        const url = this._api_url.apiUrl+'logout_users/'+id;

        //console.log(this.getToken())
        return this._http.get(url,this.getToken());
    }

    filterByQuartier = (quartiers: string) => {
        const url = this._api_url.apiUrl + 'filter_with_quartiers/'+quartiers;
        return this._http.get(url, this.getToken());
    }

    filterByQuery = (query: string) => {
        const url = this._api_url.apiUrl + 'filter_with_query/'+query;
        return this._http.get(url, this.getToken());
    }


    filterByLieuVote = (lieu_vote: string) => {
        const url = this._api_url.apiUrl + 'filter_with_lieu_vote/'+lieu_vote;
        return this._http.get(url, this.getToken());
    }


    // STATISTIQUE

    getAdminStatistique = () => {
        const url = this._api_url.apiUrl + 'get_admin_statistique';
        return this._http.get(url,this.getToken());
    }


}
