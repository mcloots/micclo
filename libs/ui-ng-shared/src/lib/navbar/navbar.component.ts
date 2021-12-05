import { Component, Input } from '@angular/core';
import { Navbar } from '@micclo/util-interface';

@Component({
  selector: 'micclo-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() navbar! : Navbar;


}
