import { Component, OnInit } from '@angular/core';
import { Player } from '@micclo/util-interface'

@Component({
  selector: 'micclo-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  players : Player[] = [{id: "1", name:"Michaël", score: 501}, {id: "2", name:"Evy", score: 501}]

  constructor() { }

  ngOnInit(): void {
  }

}
