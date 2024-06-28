import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthsComponent } from '@pages/auths/auths.component';

const routes: Routes = [
    {
        path: '',
        component: AuthsComponent,
        data: { title: 'Authentification' },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthLayoutRoutingModule {}
