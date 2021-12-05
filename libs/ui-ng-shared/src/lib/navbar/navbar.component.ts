import { Component, Input, OnInit } from '@angular/core';
import { Navbar, NavItem } from '@micclo/util-interface';

@Component({
  selector: 'micclo-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() navbar! : Navbar;


  constructor() { }

  ngOnInit(): void {

  }

}
