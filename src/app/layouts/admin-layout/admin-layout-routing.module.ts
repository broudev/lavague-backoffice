import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMembresComponent } from '@pages/admins/admin-membres/admin-membres.component';
import { AdminFonctionsComponent } from '@pages/admins/admin-fonctions/admin-fonctions.component';
import { AdminLieuVoteComponent } from '@pages/admins/admin-lieu-vote/admin-lieu-vote.component';
import { AdminQuartiersComponent } from '@pages/admins/admin-quartiers/admin-quartiers.component';
import { AdminUsersAccountsComponent } from '@pages/admins/admin-users-accounts/admin-users-accounts.component';
import { UserRoleListComponent } from '@pages/admins/admin-users-accounts/user-role-list/user-role-list.component';
import { AdminWelcomeComponent } from '@pages/admins/admin-welcome/admin-welcome.component';
import { DetailMembresComponent } from '@pages/admins/admin-membres/detail-membres/detail-membres.component';

const routes: Routes = [

    //
    {
        path: 'data-collector',
        component: AdminWelcomeComponent,
        data: { title: 'Administration' },
    },

    {
        path: 'data-collector/users',
        component: AdminUsersAccountsComponent,
        data: { title: 'Liste des utilisateurs' },
    },
    {
        path: 'data-collector/user-role',
        component: UserRoleListComponent,
        data: { title: 'Liste des rôles' },
    },
    {
        path: 'data-collector/list-membres',
        component: AdminMembresComponent,
        data: { title: 'Liste des membres' },
    },
    {
        path: 'data-collector/detail-membres/:slug',
        component: DetailMembresComponent,
        data: { title: 'Detail membre' },
    },
    {
        path: 'data-collector/quartiers',
        component: AdminQuartiersComponent,
        data: { title: 'Liste des quartiers' },
    },
    {
        path: 'data-collector/lieu-vote',
        component: AdminLieuVoteComponent,
        data: { title: 'Liste des lieus de vote' },
    },
    {
        path: 'data-collector/fonctions',
        component: AdminFonctionsComponent,
        data: { title: 'Liste des fonctions' },
    }



];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminLayoutRoutingModule {}
