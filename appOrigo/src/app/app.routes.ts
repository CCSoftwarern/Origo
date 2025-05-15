import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/Login/login/login.component';
import { PrincipalComponent } from './componentes/principal/principal.component';

export const routes: Routes = [ 
    {

        path: 'login',
        title: 'Login',
        component: LoginComponent

    },

    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'principal',
        title: 'Principal',
        component: PrincipalComponent
    }
];
