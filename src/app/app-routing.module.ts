import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import { UserDetailResolver } from './common';
import { NewPollComponent } from './pages/new-poll/new-poll.component';
import { PollDetailsComponent } from './pages/poll-details/poll-details.component';
import { MyPollsComponent } from './pages/my-polls/my-polls.component';
import { AuthenticationGuard} from './common/guards/authentication.guard';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: 'dashboard', component: DashboardComponent, resolve: { userDetails: UserDetailResolver }},
      {path: 'newPoll', component: NewPollComponent, resolve: { userDetails: UserDetailResolver }},
      {path: 'pollDetails/:id', component: PollDetailsComponent, resolve: { userDetails: UserDetailResolver }},
      {path: 'my-polls',
       component: MyPollsComponent,
       resolve: { userDetails: UserDetailResolver },
       canActivate: [AuthenticationGuard]
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
