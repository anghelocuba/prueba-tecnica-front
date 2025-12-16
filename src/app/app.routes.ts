import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/registrar/registrar.component';

export const routes: Routes = [
    { path: '', redirectTo: 'register', pathMatch: 'full' },
    { path: 'register', component: RegisterComponent }
];
