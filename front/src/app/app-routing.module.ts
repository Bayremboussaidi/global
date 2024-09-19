import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { RepasComponent } from './ADMIN/repas/repas.component';
import { AddTransComponent } from './add-trans/add-trans.component';
import { UsersComponent } from './ADMIN/users/users.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profil/profile.component';
import { SigninComponent } from './signin/signin.component';
//import { authGuard } from './auth.guard';
import { DashboardAComponent } from './ADMIN/dashboard-a/dashboard-a.component';
import { ShowRepasComponent } from './show-rep/show-rep.component';
import { ShowTransComponent } from './ADMIN/show-trans/show-trans.component';
import { HeadComponent } from './head/head.component';
import { ShowReclamationComponent } from './ADMIN/show-rec/show-rec.component';
import { RepasListComponent } from './ADMIN/repas-list/repas-list.component';
import { TransportListComponent } from './ADMIN/transport-list/transport-list.component';
import { authGuard } from './auth.guard';

const routes:
 Routes = [
  { path: 'signin', component: SigninComponent, data: { animation: 'SigninPage' } },
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent, data: { animation: 'SignupPage' } },
  { path: 'repas-a', component: RepasComponent, data: { animation: 'RepasPage' } },
  { path: 'transport-a', component: AddTransComponent, canActivate: [authGuard], data: { role: 'admin', animation: 'TransportPage' } },
  { path: 'users-a', component: UsersComponent, data: { animation: 'UsersPage' } },
  { path: 'reclamation', component: ReclamationComponent, data: { animation: 'ReclamationPage' } },
  { path: 'dashboard', component: DashboardComponent, data: { animation: 'DashboardPage' } },
  { path: 'header', component: HeaderComponent },
  { path: 'editp', component: ProfileComponent, data: { animation: 'EditProfilePage' } },
  { path: 'dash-admin', component: DashboardAComponent, canActivate: [authGuard], data: { role: 'admin', animation: 'AdminDashboardPage' } },
  { path: 'repas', component: ShowRepasComponent, data: { animation: 'ShowRepasPage' } },
  { path: 'trans', component: ShowTransComponent, data: { animation: 'ShowTransPage' } },
  { path: 'head', component: HeadComponent, data: { animation: 'HeadPage' } },
  { path: 'reclam-admin', component: ShowReclamationComponent, canActivate: [authGuard], data: { role: 'admin', animation: 'AdminReclamationPage' } },
  { path: 'commanderepas', component: RepasListComponent, data: { animation: 'CommandeRepasPage' } },
  { path: 'commandetrans', component: TransportListComponent, data: { animation: 'CommandeTransPage' } }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}


/* Routes = [
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
    path: 'repas-a',         //add food
    component: RepasComponent , //canActivate :[ authGuard ] 
  },
  {
    path: 'transport-a',   
    component: AddTransComponent, canActivate: [authGuard], data: { role: 'admin' } },
  
  {
    path: 'users-a',
    component: UsersComponent, //canActivate :[ authGuard ] 
   
   // data : {'role': ['admin']}
  },
  {
    path: 'reclamation',
    component: ReclamationComponent , data: { animation: 'AboutPage' }
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
  component: ProfileComponent
  },
  {path: 'dash-admin',
    component: DashboardAComponent , canActivate: [authGuard], data: { role: 'admin' } },
   
  {path: 'repas',
    component: ShowRepasComponent //choose your food
  },
  {path: 'trans',
    component: ShowTransComponent  //choose your transport traject
  },
  {path: 'head',
    component: HeadComponent 
  },
  {path: 'reclam-admin',
    component: ShowReclamationComponent , canActivate: [authGuard], data: { role: 'admin' } 
  },
  {path: 'commanderepas',
    component: RepasListComponent 
  },
  {path: 'commandetrans',
    component: TransportListComponent 
  }

  
];*/


