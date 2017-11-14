import { NgModule } from '@angular/core';

import { AppComponentsModule } from './components/components.module';
import {
    PollsApi
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
    PollsApi
],
  exports: [
     AppComponentsModule
  ]
})
export class AppCommonModule {}
