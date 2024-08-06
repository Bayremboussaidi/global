import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { RepasComponent } from './ADMIN/repas/repas.component';
import { TransportComponent } from './ADMIN/transport/transport.component';
import { UsersComponent } from './ADMIN/users/users.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profil/profile.component';
import { SigninComponent } from './signin/signin.component';
//import { authGuard } from './auth.guard';
import { DashboardAComponent } from './ADMIN/dashboard-a/dashboard-a.component';
import { ShowRepasComponent } from './show-rep/show-rep.component';
import { ShowTransComponent } from './show-trans/show-trans.component';
import { HeadComponent } from './head/head.component';
import { ShowReclamationComponent } from './ADMIN/show-rec/show-rec.component';
import { RepasListComponent } from './ADMIN/repas-list/repas-list.component';
import { TransportListComponent } from './ADMIN/transport-list/transport-list.component';

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
    path: 'repas-a',         //add food
    component: RepasComponent , //canActivate :[ authGuard ] 
  },
  {
    path: 'transport-a',   //add transport trajects
    component: TransportComponent, //canActivate :[ authGuard ] 
  },
  {
    path: 'users-a',
    component: UsersComponent, //canActivate :[ authGuard ] 
   
   // data : {'role': ['admin']}
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
  component: ProfileComponent
  },
  {path: 'dash-admin',
    component: DashboardAComponent , //canActivate :[ authGuard ] 
  },  
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
    component: ShowReclamationComponent
  },
  {path: 'commanderepas',
    component: RepasListComponent //repas commands list
  },
  {path: 'commandetrans',
    component: TransportListComponent //transport command list
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
