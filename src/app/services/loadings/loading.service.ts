import { Injectable } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";


@Injectable({
    providedIn: 'root',
})
export class LoadingService {
    constructor(private spinner: NgxSpinnerService) {}

    show_loading = () => {
        return this.spinner.show();
    };

    hide_loading = () => {
        return this.spinner.hide();
    };
}
