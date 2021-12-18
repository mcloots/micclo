import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'micclo-game-landing',
  templateUrl: './game-landing.component.html',
  styleUrls: ['./game-landing.component.scss']
})
export class GameLandingComponent {

  constructor(private router : Router) { }


  startGame(player: string) {
    switch (player) {
      case "M":
        this.router.navigate(['/game/' + 1989]);
        break;
        case "K":
          this.router.navigate(['/game/' + 1980]);
          break;
      default:
        break;
    }
  }

}
