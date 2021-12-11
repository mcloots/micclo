import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Player, Score, Throw } from '@micclo/util-interface';
import { Subscription } from 'rxjs';
import { DartsService } from '@micclo/darts-ui/services';

@Component({
  selector: 'micclo-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy {
  average = 0.00;
  totalTurnPoints: number[] = [];
  turnThrows: Throw[] = [];
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
    if (special === '25') {
      return 'bg-success';
    }
    if (special === '50') {
      return 'bg-danger';
    }
    return '';
  }

  addThrow(dn: number): void {
    this.addThrowToTurn({player:'619bf83c95971fe8b714f6f6', points: dn, isDouble: this.isDouble, isTriple: this.isTriple, isGreenBull:  this.isGreenBull, isRedBull: this.isRedBull });

    this.resetSpecials();
  }

  selectSpecial(ds: string): void {
    switch (ds) {
      case 'D':
        this.isDouble = !this.isDouble;
        this.isTriple = false;
        break;
      case 'T':
        this.isTriple = !this.isTriple;
        this.isDouble = false;
        break;
      case '25':
        this.isGreenBull = true;
        this.addThrow(25);
        break;
      case '50':
        this.isRedBull = true;
        this.addThrow(50);
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

  endTurn(): void {
    let totalScore = 0;
    for (const thr of this.turnThrows) {
      let finalScore = thr.points ?? 0;
      if (thr.isDouble) {
        finalScore *= 2;
      } else if (thr.isTriple) {
        finalScore *= 3;
      }

      totalScore += finalScore;

      this.postThrow$ = this.dartsService.postThrow(thr).subscribe();
    }

    this.totalTurnPoints.push(totalScore);
    this.average = this.totalTurnPoints.reduce((a,b) => a + b, 0) / this.totalTurnPoints.length;

    if (this.throwingPlayer.score - totalScore > 0) {
      this.throwingPlayer.score = this.throwingPlayer.score - totalScore;
    } else {
      this.throwingPlayer.score = 501;
    }
    this.turnThrows = [];
  }

  addThrowToTurn(thr: Throw): void {
    if (this.turnThrows.length < 3) {
      this.turnThrows.push(thr);
    }
  }

  formatThrowToStringRepresentation(thr: Throw): string {
    if (thr) {
      if (thr.isGreenBull) {
        return '25';
      }
      if (thr.isRedBull) {
        return '50';
      }
      if (thr.isDouble) {
        return 'D' + thr.points;
      }
      if (thr.isTriple) {
        return 'T' + thr.points;
      }
      if (thr.points) {
        return thr.points.toString();
      }
    }
    return '';
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
