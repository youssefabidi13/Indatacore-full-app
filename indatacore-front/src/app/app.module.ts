import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from  '@angular/common/http';

import { AppComponent } from './app.component';
import { GestionDepartementComponent } from './components/gestion-departement/gestion-departement.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTablesModule } from 'angular-datatables';
import { FormEditComponent } from './components/form-edit/form-edit.component';
import { GestionStudentComponent } from './components/gestion-student/gestion-student.component';
import { FormEditStudentComponent } from './components/form-edit-student/form-edit-student.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { LoginComponent } from './components/login/login.component';
import { AppInterceptorInterceptor } from './interceptors/app-interceptor.interceptor';
import { AuthenticationGuard } from './guards/authentication.guard';
import { RegisterComponent } from './components/register/register.component';
const routes: Routes = [
  { path:"", redirectTo:"/login", pathMatch:"full"},
  { path:"login", component:LoginComponent},
  { path:"register",component:RegisterComponent},
  { path:"gestion-departement", component:GestionDepartementComponent,canActivate:[AuthenticationGuard]},
  {path:"upload-file",component:UploadFileComponent,canActivate:[AuthenticationGuard]},
  { path:"gestion-student", component:GestionStudentComponent,canActivate:[AuthenticationGuard]},
  { path:"form-edit-student/:id", component:FormEditStudentComponent,canActivate:[AuthenticationGuard]},
  { path:"form-edit/:id", component:FormEditComponent,canActivate:[AuthenticationGuard]},
  { path:"dashboard", component:DashboardComponent,canActivate:[AuthenticationGuard]},

];


export const routing = RouterModule.forRoot(routes);

@NgModule({
  declarations: [
    AppComponent,
    GestionDepartementComponent,
    HeaderComponent,
    FormEditComponent,
    GestionStudentComponent,
    FormEditStudentComponent,
    DashboardComponent,
    UploadFileComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NgbModule,
    DataTablesModule ,
    HttpClientModule,
    ReactiveFormsModule,
    DataTablesModule,
    FormsModule,
    NgxFileDropModule,
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS, useClass : AppInterceptorInterceptor, multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
