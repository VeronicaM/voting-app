import { NgModule } from '@angular/core';
import { AuthenticationGuard } from './guards/authentication.guard';
import { UserDetailResolver } from './guards/user-details.resolver';
import { AppTopBarComponent } from './components/app-top-bar/app-top-bar.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import {
  SharedModule
} from '../_shared/shared.module';
import {
    PollsApi,
    LoginApi,
    AuthTokenService,
    NotificationService,
  } from './services';
  import {
    PollsStoreService,
    LoginStoreService
  } from './store';

@NgModule({
  imports: [SharedModule],
  declarations: [
    AppFooterComponent,
    AppTopBarComponent
  ],
  providers: [
    PollsStoreService,
    LoginStoreService,
    PollsApi,
    LoginApi,
    AuthTokenService,
    NotificationService,
    AuthenticationGuard,
    UserDetailResolver
],
  exports: [
    AppFooterComponent,
    AppTopBarComponent
  ]
})
export class AppCommonModule {}
