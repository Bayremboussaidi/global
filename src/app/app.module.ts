import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './signup/signup.component';
import { UsersComponent } from './ADMIN/users/users.component';
import { RepasComponent } from './ADMIN/repas/repas.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { TransportComponent } from './ADMIN/transport/transport.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profil/profile.component';
import { SigninComponent } from './signin/signin.component';
import { MatDialogModule } from '@angular/material/dialog'; // Import MatDialogModule
import { HttpClientModule } from '@angular/common/http';
import { ShowRepComponent } from './show-rep/show-rep.component';
import { ShowTransComponent } from './show-trans/show-trans.component';
import { DashboardAComponent } from './ADMIN/dashboard-a/dashboard-a.component';
import { HeadComponent } from './head/head.component';
import { ShowRecComponent } from './ADMIN/show-rec/show-rec.component'; 


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    UsersComponent,
    RepasComponent,
    TransportComponent,
    ReclamationComponent,
    DashboardComponent,
    NavbarComponent,
    HeaderComponent,
    ProfileComponent,
    ShowRepComponent,
    ShowTransComponent,
    DashboardAComponent,
    HeadComponent,
    ShowRecComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSelectModule,
    MatOptionModule,
    MatTableModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
