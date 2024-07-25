import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { RepasComponent } from './repas/repas.component';
import { TransportComponent } from './transport/transport.component';
import { UsersComponent } from './users/users.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { ProfilComponent } from './profil/profil.component';
import { SigninComponent } from './signin/signin.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'signin',
    component: SigninComponent
  },
  { path: '', redirectTo: 'signin', pathMatch: 'full' } ,
  {
    path: 'signup', 
    component: SignupComponent
  },
  {
    path: 'repas',
    component: RepasComponent
  },
  {
    path: 'transport',
    component: TransportComponent
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate :[ authGuard ] ,
    data : {'role': ['admin']}
  },
  {
    path: 'reclamation',
    component: ReclamationComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'header',
    component: HeaderComponent
  },
  {path: 'editp',
  component: ProfilComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
