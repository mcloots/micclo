import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { FormsModule } from '@angular/forms';
import {  HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: GameComponent}
    ]),
    FormsModule,
    HttpClientModule
  ],
  declarations: [
    GameComponent
  ],
})
export class DartsUiFeatureGameModule {}
