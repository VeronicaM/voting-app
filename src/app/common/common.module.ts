import { NgModule } from "@angular/core";

import { AppServicesModule } from './services/services.module';
import { AppComponentsModule } from './components/components.module';

@NgModule({
  imports: [
      AppServicesModule,
      AppComponentsModule
  ],
  declarations: [
  ],
  providers: [
  ],
  exports: [
      AppServicesModule, AppComponentsModule
  ]
})
export class AppCommonModule {}
