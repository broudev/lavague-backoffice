import { Routes } from '@angular/router';
import { AdminLayoutComponent } from '@layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from '@layouts/auth-layout/auth-layout.component';
import { Error404Component } from '@pages/error-404/error-404.component';

export const routes: Routes = [

    {
        path: "",
        redirectTo: "",
        pathMatch: "full"
    },
    {
        path: "",
        component: AuthLayoutComponent,
        children: [
            {
                path: "",
                loadChildren: () => import("./layouts/auth-layout/auth-layout.module").then(m => m.AuthLayoutModule)
            }
        ],
    },
    {
        path: "",
        component: AdminLayoutComponent,
        children: [
            {
                path: "",
                loadChildren: () => import("./layouts/admin-layout/admin-layout.module").then(m => m.AdminLayoutModule)
            }
        ],
    }
    ,
    {
        path: "404-error",
        component: Error404Component,
        data: { title: "Not Found" }
    },

    {
        path: "**",
        redirectTo: "404-error"
    }
];
