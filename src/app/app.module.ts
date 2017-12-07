import 'hammerjs';
import './rxjs.imports';
import { JwtModule } from '@auth0/angular-jwt';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Router } from '@angular/router';
import { PollsEffects } from './common/store';
import { reducers } from './common/store/app.store';

import { ChartsModule } from 'ng2-charts-x';
import { LoginModule } from './pages/login/login.module';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './_shared/shared.module';
import { AppCommonModule } from './common/common.module';
import { InterceptedHttp } from './config/http.interceptor';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NewPollComponent } from './pages/new-poll/new-poll.component';
import { PollDetailsComponent } from './pages/poll-details/poll-details.component';
import { MyPollsComponent } from './pages/my-polls/my-polls.component';
import { ChartDisplayComponent } from './pages/chart-display/chart-display.component';
export function getTokenFunction() {
  return localStorage.getItem('token');
}
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NewPollComponent,
    PollDetailsComponent,
    MyPollsComponent,
    ChartDisplayComponent,
  ],
  imports: [
    BrowserModule,
    LoginModule,
    ChartsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    AppCommonModule,
    StoreModule.forRoot(reducers),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([PollsEffects]),
    JwtModule.forRoot({
      config: {
        tokenGetter: getTokenFunction,
      },
    }),
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptedHttp,
      multi: true,
    },
  ],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
