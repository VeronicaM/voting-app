import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: 'dashboard', component: DashboardComponent},
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
