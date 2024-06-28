import { Injectable } from '@angular/core';
import { StorageManagerService } from '../storage/storage-manager.service';

@Injectable({
    providedIn: 'root'
})
export class UserDataManagerService {

    constructor(
        private _localStorage: StorageManagerService
    ) { }

    public data: any = {};

    getUserData(){
        const data_decrypted: any = this._localStorage.getDataToStorage();

        return this.data = {
            name: data_decrypted.first_name +' '+ data_decrypted.last_name,
            first_name: data_decrypted.first_name,
            last_name: data_decrypted.last_name,
            user_id: data_decrypted.user_id,

            role: data_decrypted.role,
            photo: data_decrypted.photo,
            type_accounts: data_decrypted.type_accounts,
            employe_matricule: data_decrypted.employe_matricule
        }
    }
}
