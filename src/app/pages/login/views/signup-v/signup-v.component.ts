import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoginApi } from '../../../../common';
import appConstants from '../../../../common/app-constants';
import { environment } from '../../../../../environments/environment';
import constants from '../../config/constants';


@Component({
  selector: 'app-signup-v',
  templateUrl: './signup-v.component.html',
  styleUrls: ['./signup-v.component.scss']
})
export class SignupVComponent {
  public user = {
    name: '',
    email: '',
    password: ''
  };
  errorMessage: string;
  isSigningIn = false;

  constructor(private loginApi: LoginApi, private router: Router) { }

  loginOauth(provider) {
    window.location.href = `${environment.serverURL}/auth/${provider}`;
  }

  signUp() {
    this.isSigningIn = true;
    this.loginApi.signUp(this.user).subscribe(
      resp => {
        this.isSigningIn = false;
        this.router.navigate([appConstants.routes.POLLS]);
      },
      (error) => {
        this.isSigningIn = false;
        if (error.status === appConstants.errorCode.Unauthorized) {
          this.errorMessage = constants.wrongCredentials;
        } else if (error.status === appConstants.errorCode.UnprocessableEntity) {
          this.errorMessage = constants.uniqueEmailError;
        } else {
          this.errorMessage = constants.genericError;
        }
      });
  }

  valuechange($event) {
    this.errorMessage = undefined;
  }

}
