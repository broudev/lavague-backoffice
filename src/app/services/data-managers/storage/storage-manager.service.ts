import { Injectable } from '@angular/core';
import  *  as CryptoJS from  'crypto-js';


@Injectable({
    providedIn: 'root'
})
export class StorageManagerService {

    key: string = '1000scripts';
    constructor(
    ) { }


    setTokenToStorage (token: string) {

        // Token keys: #007@#
        let token_crypted = CryptoJS.AES.encrypt(token, this.key).toString()
        localStorage.setItem('#007@#', token_crypted);
    }

    getTokenToStorage = () => {

        const token_crypted: any = localStorage.getItem('#007@#');

        if(token_crypted != null){

            const token_decrypted = CryptoJS.AES.decrypt(token_crypted, this.key).toString(CryptoJS.enc.Utf8);

            return token_decrypted;
        }else{
            return null;
        }

    }

    setDataToStorage(data: string) {
        //User data keys: @1000M*X#23
        let data_crypted = CryptoJS.AES.encrypt(JSON.stringify(data), this.key).toString()
        localStorage.setItem('@1000M*X#23', data_crypted);
    }


    getDataToStorage = () => {

        const data_crypted: any = localStorage.getItem('@1000M*X#23');

        const data_decrypted = CryptoJS.AES.decrypt(data_crypted, this.key).toString(CryptoJS.enc.Utf8);
        return JSON.parse(data_decrypted);


    }


    setIsLoggedToStorage (data: string) {

        //set logged response to localstorage: ##

        let data_crypted = CryptoJS.AES.encrypt(data, this.key).toString()
        localStorage.setItem('##', data_crypted);
    }

    getIsLoggedToStorage = () => {

        const data_crypted: any = localStorage.getItem('##');

        const data_decrypted = CryptoJS.AES.decrypt(data_crypted, this.key).toString(CryptoJS.enc.Utf8);

        return data_decrypted;
    }

    checkTokenToStorage = () => {

        const data_crypted: any = localStorage.getItem('##');
        if(data_crypted == undefined || data_crypted == "null") {
            return false;
        }else{
            const data_decrypted = this.getIsLoggedToStorage()
            if(data_decrypted == "true")
            {
                return true;
            }else {
                return false;
            }

        }
    }
}
