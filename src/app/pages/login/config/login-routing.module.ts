import { LoginVComponent } from '../views/login-v/login-v.component';
import { SignupVComponent } from '../views/signup-v/signup-v.component';
import { LoginComponent } from '../login.component';
import { TwitterComponent } from '../twitter/twitter.component';
import { UnauthenticatedGuard} from '../../../common/guards/unauthenticated.guard';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';


export const loginChildRoutes: Routes = [
  {
    path: 'go',
    component: LoginComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full'},
      { path: 'login', component: LoginVComponent, data: { 'title': 'Login' },  canActivate: [UnauthenticatedGuard] },
      { path: 'signup', component: SignupVComponent, data: { 'title': 'Signup' },  canActivate: [UnauthenticatedGuard] },
      { path: 'twitter', component: TwitterComponent }
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
