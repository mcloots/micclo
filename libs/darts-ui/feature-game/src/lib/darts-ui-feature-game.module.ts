import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { FormsModule } from '@angular/forms';
import {  HttpClientModule} from '@angular/common/http';
import { GameLandingComponent } from './game-landing/game-landing.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: GameLandingComponent},
      {path: 'game/:playercode', pathMatch: 'full', component: GameComponent},
      {path: 'statistics/:playercode', pathMatch: 'full', component: StatisticsComponent}
    ]),
    FormsModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  declarations: [
    GameComponent,
    GameLandingComponent,
    StatisticsComponent
  ],
})
export class DartsUiFeatureGameModule {}
