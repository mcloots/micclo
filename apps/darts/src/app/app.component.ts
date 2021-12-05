import { Component } from '@angular/core';
import { Navbar, NavItem, Breakpoint } from '@micclo/util-interface';

@Component({
  selector: 'micclo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  navbar?: Navbar;

  constructor(){
      this.navbar = new Navbar("Darts", { bp: "lg"}, false, "bg-primary");
  }

}
