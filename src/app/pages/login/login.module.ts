import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../_shared/shared.module';

import { LoginComponent } from './login.component';
import { LoginVComponent } from './views/login-v/login-v.component';
import { SignupVComponent } from './views/signup-v/signup-v.component';
import { LoginRoutingModule } from './config/login-routing.module';
import { TwitterComponent } from './twitter/twitter.component';

@NgModule({
  imports: [ RouterModule, SharedModule, LoginRoutingModule, CommonModule ],
  exports: [LoginRoutingModule],
  declarations: [LoginComponent, LoginVComponent, SignupVComponent, TwitterComponent],
  providers: [ ],
})
export class LoginModule { }
