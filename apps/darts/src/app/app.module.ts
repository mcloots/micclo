import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { UiNgSharedModule } from '@micclo/ui-ng-shared';
import { HttpClientModule } from '@angular/common/http';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: () =>
            import('@micclo/darts-ui/feature-game').then(
              (module) => module.DartsUiFeatureGameModule
            ),
        },
        {
          path: 'play',
          loadChildren: () =>
            import('@micclo/darts-ui/feature-game').then(
              (module) => module.DartsUiFeatureGameModule
            ),
        },
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
    UiNgSharedModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
