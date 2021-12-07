import { Component } from '@angular/core';
import { Navbar } from '@micclo/util-interface';

@Component({
  selector: 'micclo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  navbar?: Navbar;

  constructor(){
      this.navbar = new Navbar("Darts", 
      { bp: "lg"}, 
      false, "/",
      [{name: "Start game", url:"play"},
      {name: "Settings", url:"settings"}], 
      undefined, 
      "bg-primary");
  }

}
