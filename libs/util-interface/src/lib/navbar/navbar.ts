import { Breakpoint } from "../global/globals";

export class Navbar {
    //Breakpoint: //navbar-expand-lg --> breakpoint to expand on
    navbarThemePrefix: string = "navbar";
    navbarExpandPrefix: string = "navbar-expand";

    constructor(public title: string, public expandBp: Breakpoint, public isLightTheme: boolean, public backgroundColor?: string){}

    get onExpandClass(): string {
        return `${this.navbarExpandPrefix}-${this.expandBp.bp}`;
    }

    get themeClass(): string {
        if(this.isLightTheme) {
            return `${this.navbarThemePrefix}-light  ${this.backgroundColor ?? 'bg-light'}`;
        } else {
            return `${this.navbarThemePrefix}-dark  ${this.backgroundColor ?? 'bg-dark'}`;
        }
    }

    get classes() : string {
        return this.onExpandClass + " " + this.themeClass;
    }
}

export interface NavItem {
    url: string;
    params: string;
}