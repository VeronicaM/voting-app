import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs/Subject';
import { takeUntil, filter, map, mergeMap } from 'rxjs/operators';
import { LoginApi } from './common/services/api/login.api';
import { AuthTokenService } from './common/services/authToken.service';
import appConstants from './common/app-constants';
import { NotificationService } from './common/services';
import { LoginStoreService } from './common/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  isOpen = false;
  private componentDestroyed = new Subject();
  constructor(
    private router: Router,
    public loginApi: LoginApi,
    private authTokenService: AuthTokenService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private snackBar: MatSnackBar,
    private notificationService: NotificationService,
    private loginStoreService: LoginStoreService
  ) {}

  ngOnInit() {
    this.setDocumentTitle();

    this.notificationService.subj_notification
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe((notification: any) => {
        this.openSnackBar(notification);
      });
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  openMenu(isOpen) {
    this.isOpen = isOpen;
  }

  canShowNavigation() {
    return (
      location.pathname.indexOf(appConstants.routes.LOGIN) === -1 &&
      location.pathname.indexOf(appConstants.routes.SIGNUP) === -1
    );
  }

  canShowFooter() {
    return (
      this.loginApi.getCurrentUser() &&
      location.pathname.indexOf(appConstants.routes.LOGIN) === -1
    );
  }

  logout(): void {
    this.loginStoreService.logout();
    this.loginApi.logout();
    this.isOpen = false;
    this.router.navigate([appConstants.routes.POLLS]);
  }

  openSnackBar({ message, action = '', config }) {
    const conf = new MatSnackBarConfig();
    conf.duration = 2000;
    conf.extraClasses = [config.extraClass];
    this.snackBar.open(message, action, conf);
  }

  setDocumentTitle() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data),
        takeUntil(this.componentDestroyed)
      )
      .subscribe(event => {
        const title = event['title'];
        if (title) {
          this.titleService.setTitle(title);
        }
        if (this.isOpen) {
          this.isOpen = false;
        }
      });
  }
}
