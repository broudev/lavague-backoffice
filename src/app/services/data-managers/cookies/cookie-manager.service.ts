import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import  *  as CryptoJS from  'crypto-js';


@Injectable({
    providedIn: 'root'
})
export class CookieManagerService {

    key: string = '1000scripts';
    constructor(
        private cookieService: CookieService,
    ) { }


    setTokenToCookie (token: string) {

        let token_crypted = CryptoJS.AES.encrypt(token, this.key).toString()
        this.cookieService.set('#Casandra', token_crypted); // label token on cookie
    }

    getTokenToCookie = () => {

        const token_crypted = this.cookieService.get('#Casandra');

        const token_decrypted = CryptoJS.AES.decrypt(token_crypted, this.key).toString(CryptoJS.enc.Utf8);

        return token_decrypted;
    }

    setEmailToCookie = (email: string) => {
        let email_crypted = CryptoJS.AES.encrypt(email, this.key).toString()
        this.cookieService.set('#prigogine', email_crypted);
    }

    getEmailToCookie = () => {

        const email_crypted = this.cookieService.get('#prigogine');

        const email_decrypted = CryptoJS.AES.decrypt(email_crypted, this.key).toString(CryptoJS.enc.Utf8);

        return email_decrypted;
    }

    setKeywordToCookie(keyword: string){
        let keyword_crypted = CryptoJS.AES.encrypt(keyword, this.key).toString()
        this.cookieService.set('#keyword', keyword_crypted);
    }

    getKeywordToCookie(){

        const keyword_crypted = this.cookieService.get('#keyword');

        const keyword_decrypted = CryptoJS.AES.decrypt(keyword_crypted, this.key).toString(CryptoJS.enc.Utf8);

        return keyword_decrypted;
    }



}
