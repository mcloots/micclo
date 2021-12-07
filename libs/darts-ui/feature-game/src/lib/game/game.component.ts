import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Player, Score } from '@micclo/util-interface'

@Component({
  selector: 'micclo-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  players : Player[] = [{id: "1", name:"Michaël", score: 501}, {id: "2", name:"Evy", score: 501}]
  score: Score = {id: "0", playerId: "1", score: undefined };
  isSubmitted = false;
  throwingPlayer : Player = {id: "0", name:"", score: 0};
  @ViewChild('points', { static: true}) pointsField: ElementRef | undefined;

  constructor() { }

  ngOnInit(): void {
    this.throwingPlayer = this.players[0];
  }

  updateScore(): void {
    this.isSubmitted = true;
      const prevScore = this.throwingPlayer.score;
      const newScore = (prevScore - this.score.score!);
      this.throwingPlayer.score = newScore;

      //switch player
      if(this.throwingPlayer.id === "1") {
        this.throwingPlayer = this.players[1];
      } else {
        this.throwingPlayer = this.players[0];
      }
    
      this.score.score = undefined;
      this.pointsField?.nativeElement.focus();
    this.isSubmitted = false;
  }
}
