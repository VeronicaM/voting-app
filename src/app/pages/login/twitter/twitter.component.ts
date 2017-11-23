import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthTokenService } from '../../../common/services/authToken.service';
import appConstants from '../../../common/app-constants';


@Component({
  selector: 'app-twitter',
  templateUrl: './twitter.component.html',
  styleUrls: ['./twitter.component.scss']
})
export class TwitterComponent implements OnInit {

  constructor(
    private authService: AuthTokenService,
    private router: Router) { }

  ngOnInit() {
    const token = window.location.search.split('token=')[1];
    this.authService.setToken(token);
    this.router.navigate([appConstants.routes.POLLS]);
  }

}
