import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Angular Material imports
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';

// Angular Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

// Your Components
import { SignupComponent } from './signup/signup.component';
import { UsersComponent } from './ADMIN/users/users.component';
import { RepasComponent } from './ADMIN/repas/repas.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profil/profile.component';
import { SigninComponent } from './signin/signin.component';
import { ShowRepasComponent } from './show-rep/show-rep.component';
import { ShowTransComponent } from './ADMIN/show-trans/show-trans.component';
import { DashboardAComponent } from './ADMIN/dashboard-a/dashboard-a.component';
import { HeadComponent } from './head/head.component';
import { ShowReclamationComponent } from './ADMIN/show-rec/show-rec.component';
import { RepasListComponent } from './ADMIN/repas-list/repas-list.component';
import { TransportListComponent } from './ADMIN/transport-list/transport-list.component';
import { AddTransComponent } from './add-trans/add-trans.component';
import { JwtInterceptor } from './jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    UsersComponent,
    RepasComponent,
    ReclamationComponent,
    DashboardComponent,
    NavbarComponent,
    HeaderComponent,
    ProfileComponent,
    ShowRepasComponent,
    ShowTransComponent,
    DashboardAComponent,
    HeadComponent,
    ShowReclamationComponent,
    RepasListComponent,
    TransportListComponent,
    AddTransComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  // <-- You already imported the AppRoutingModule here
    BrowserAnimationsModule,
    HttpClientModule, 
    FormsModule,
    ReactiveFormsModule,
    // Angular Material modules
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    MatOptionModule,
    MatTableModule,
    MatDialogModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
