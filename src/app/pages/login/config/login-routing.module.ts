import { LoginVComponent } from '../views/login-v/login-v.component';
import { SignupVComponent } from '../views/signup-v/signup-v.component';
import { LoginComponent } from '../login.component';
import { GoogleComponent } from '../google/google.component';
import { AuthenticationGuard} from '../../../common/guards/authentication.guard';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';


export const loginChildRoutes: Routes = [
  {
    path: 'go',
    component: LoginComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full'},
      { path: 'login', component: LoginVComponent, data: { 'title': 'Login' },  canActivate: [AuthenticationGuard] },
      { path: 'signup', component: SignupVComponent, data: { 'title': 'Signup' },  canActivate: [AuthenticationGuard] },
      { path: 'google', component: GoogleComponent,  canActivate: [AuthenticationGuard] }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(loginChildRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class LoginRoutingModule { }
