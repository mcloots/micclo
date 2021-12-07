import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: GameComponent}
    ]),
  ],
  declarations: [
    GameComponent
  ],
})
export class DartsUiFeatureGameModule {}
