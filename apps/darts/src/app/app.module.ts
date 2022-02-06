import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { UiNgSharedModule } from '@micclo/ui-ng-shared';
import { HttpClientModule } from '@angular/common/http';
import { NgxEchartsModule } from 'ngx-echarts';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
    }),
    MatDatepickerModule,
    MatMomentDateModule,
    MatInputModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'nl-BE' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
