import { Injectable } from '@angular/core';
import { EnvironmentsService } from '../environments.service';
import { HttpClient } from '@angular/common/http';
import { StorageManagerService } from '../data-managers/storage/storage-manager.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public headers: any;

    constructor(
        private _api_url: EnvironmentsService,
        private _http: HttpClient,
        private _localStorage: StorageManagerService
    ) { }



    getToken = () => {
        const tokens = this._localStorage.getTokenToStorage();
        this. headers = { headers: { 'Authorization': 'Bearer ' + tokens }};

        return this.headers;
    }

    connectAdmin = (data: any) => {
        const url = this._api_url.apiUrl+'login_admin';
        return this._http.post(url, data);
    }


    checkUserAccounts = (data: any) => {
        const url = this._api_url.apiUrl+'check_user_account';
        return this._http.post(url, data);
    }

    updateUserPassword = (data: any) => {
        const url = this._api_url.apiUrl+'update_user_password';
        return this._http.post(url, data);
    }

    logOut = (id: number) => {

        const token = this._localStorage.getTokenToStorage();

        const url = this._api_url.apiUrl+'logout_users/'+id;

        return this._http.get(url, this.getToken());
    }
}
