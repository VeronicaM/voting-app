import { NgModule } from '@angular/core';
import { AuthenticationGuard } from './guards/authentication.guard';  
import { AppComponentsModule } from './components/components.module';
import {
    PollsApi,
    LoginApi,
    AuthTokenService
  } from './services';
  import {
    PollsStoreService
  } from './store';

@NgModule({
  imports: [
      AppComponentsModule
  ],
  declarations: [
  ],
  providers: [
    PollsStoreService,
    PollsApi,
    LoginApi,
    AuthTokenService,
    AuthenticationGuard
],
  exports: [
     AppComponentsModule
  ]
})
export class AppCommonModule {}
