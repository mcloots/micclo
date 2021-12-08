import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Player, Score } from '@micclo/util-interface';
import { Subscription } from 'rxjs';
import { DartsService } from '../darts-service';
import { Throw } from '../throw';

@Component({
  selector: 'micclo-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy {
  throwArrow: Throw = {
    player: '619bf83c95971fe8b714f6f6',
    points: undefined,
    isDouble: false,
    isTriple: false,
    isGreenBull: false,
    isRedBull: false,
  };
  postThrow$: Subscription = new Subscription();

  players: Player[] = [
    {
      id: '1',
      name: 'Michaël',
      score: 501,
    } /*, {id: "2", name:"Evy", score: 501}*/,
  ];
  score: Score = { id: '0', playerId: '1', score: undefined };
  isSubmitted = false;
  throwingPlayer: Player = { id: '0', name: '', score: 0 };
  @ViewChild('points', { static: true }) pointsField: ElementRef | undefined;

  dartsSpecials: string[] = ['T', 'D', '50', '25'];
  dartsNumbers: number[] = [
    20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1,
  ];

  isDouble = false;
  isTriple = false;
  isGreenBull = false;
  isRedBull = false;

  constructor(private dartsService: DartsService) {}

  ngOnInit(): void {
    this.throwingPlayer = this.players[0];
  }

  ngOnDestroy(): void {
    this.postThrow$.unsubscribe();
  }

  getClass(special: string): string {
    if (special === 'T' && this.isTriple) {
      return 'bg-success';
    }
    if (special === 'D' && this.isDouble) {
      return 'bg-success';
    }

    return '';
  }

  reduceScore(dn: number): void {
    let finalScore = dn;
    if (this.isDouble) {
      finalScore *= 2;
    } else if (this.isTriple) {
      finalScore *= 3;
    }

    // Make api call
    this.throwArrow.player = '619bf83c95971fe8b714f6f6';
    this.throwArrow.points = dn;
    this.throwArrow.isDouble = this.isDouble;
    this.throwArrow.isTriple = this.isTriple;
    this.throwArrow.isGreenBull = this.isGreenBull;
    this.throwArrow.isRedBull = this.isRedBull;

    this.postThrow$ = this.dartsService
      .postThrow(this.throwArrow)
      .subscribe((result) => {
        //all went well
        this.throwArrow = {
          player: '619bf83c95971fe8b714f6f6',
          points: undefined,
          isDouble: false,
          isTriple: false,
          isGreenBull: false,
          isRedBull: false,
        };
        this.isSubmitted = false;

        if (this.throwingPlayer.score - finalScore > 0) {
          this.throwingPlayer.score = this.throwingPlayer.score - finalScore;
        } else {
          this.throwingPlayer.score = 501;
        }

        this.resetSpecials();
      });
  }

  selectSpecial(ds: string): void {
    switch (ds) {
      case 'D':
        this.isDouble = true;
        break;
      case 'T':
        this.isTriple = true;
        break;
      case '25':
        this.isGreenBull = true;
        this.reduceScore(25);
        break;
      case '50':
        this.isRedBull = true;
        this.reduceScore(50);
        break;
      default:
        break;
    }
  }

  resetSpecials(): void {
    this.isDouble = false;
    this.isTriple = false;
    this.isGreenBull = false;
    this.isRedBull = false;
  }

  updateScore(): void {
    // this.isSubmitted = true;
    //   const prevScore = this.throwingPlayer.score;
    //   const newScore = (prevScore - this.score.score!);
    //   this.throwingPlayer.score = newScore;
    //   //switch player
    //   if(this.throwingPlayer.id === "1") {
    //     this.throwingPlayer = this.players[1];
    //   } else {
    //     this.throwingPlayer = this.players[0];
    //   }
    //   this.score.score = undefined;
    //   this.pointsField?.nativeElement.focus();
    // this.isSubmitted = false;
  }
}
