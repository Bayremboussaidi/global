import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RepasComponent } from './repas/repas.component';
import { TransportComponent } from './transport/transport.component';
import { UsersComponent } from './users/users.component';
import { ReclamationComponent } from './reclamation/reclamation.component';

const routes: Routes = [
  {
    path: 'signin',
    component: LoginComponent
  },
  { path: '', redirectTo: '/auth/signin', pathMatch: 'full' } ,
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
    component: UsersComponent
  },
  {
    path: 'reclamation',
    component: ReclamationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
