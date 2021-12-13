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
import {
  getClass,
  selectSpecial,
  addThrowToTurn,
  formatThrowToStringRepresentation,
  calculateScoreFromThrow,
  getAverageTurnScore,
  endGame,
} from '@micclo/util-functions-darts';

@Component({
  selector: 'micclo-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy {
  average = 0.0;
  totalTurnPoints: number[] = [];
  turnThrows: Throw[] = [];
  postThrow$: Subscription = new Subscription();
  endCombinations: string[] = [];

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

  //Gets class for buttons + makes T/D green if chosen and back normal if T/D score was selected
  getClass = getClass;
  //Gets string representation of throw, so we can show it in the purple circle
  formatThrowToStringRepresentation = formatThrowToStringRepresentation;

  constructor(private dartsService: DartsService) {}

  ngOnInit(): void {
    this.throwingPlayer = this.players[0];
  }

  ngOnDestroy(): void {
    this.postThrow$.unsubscribe();
  }

  addThrow(dn: number): void {
    this.addThrowToTurn({
      player: '619bf83c95971fe8b714f6f6',
      points: dn,
      isDouble: this.isDouble,
      isTriple: this.isTriple,
      isGreenBull: this.isGreenBull,
      isRedBull: this.isRedBull,
    });

    this.resetSpecials();
  }

  specialThrow(ds: string): void {
    const special = {
      ds: ds,
      isDouble: this.isDouble,
      isTriple: this.isTriple,
      isGreenBull: this.isGreenBull,
      isRedBull: this.isRedBull,
    };

    const specialNumber = selectSpecial(special);
    this.isTriple = special.isTriple;
    this.isDouble = special.isDouble;
    this.isGreenBull = special.isGreenBull;
    this.isRedBull = special.isRedBull;
    if (specialNumber) {
      this.addThrow(specialNumber);
    }
  }

  resetSpecials(): void {
    this.isDouble = false;
    this.isTriple = false;
    this.isGreenBull = false;
    this.isRedBull = false;
  }

  endTurn(): void {
    let turnScore = 0;
    for (const thr of this.turnThrows) {
      turnScore += calculateScoreFromThrow(thr);

      this.postThrow$ = this.dartsService.postThrow(thr).subscribe();
    }

    this.totalTurnPoints.push(turnScore);
    this.average = getAverageTurnScore(this.totalTurnPoints);

    if (endGame(turnScore, this.throwingPlayer.score)) {
      //Game is ended!
      this.throwingPlayer.score = 501;
      this.average = 0;
    } else {
      //Game continues!
      this.throwingPlayer.score = this.throwingPlayer.score - turnScore;

      //Check if user can end with 3 throws
      this.endCombinations = this.dartsService.getFinishCombination(this.throwingPlayer.score.toString());

    }

    this.turnThrows = [];
  }

  addThrowToTurn(thr: Throw): void {
    addThrowToTurn(thr, this.turnThrows);
  }
}
