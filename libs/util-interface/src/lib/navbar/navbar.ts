import { Breakpoint } from "../global/globals";

export class Navbar {
    //Breakpoint: //navbar-expand-lg --> breakpoint to expand on
    navbarThemePrefix = "navbar";
    navbarExpandPrefix = "navbar-expand";

    constructor(public title: string, public expandBp: Breakpoint, public isLightTheme: boolean, public brandRouterLink: string, public items: NavItem[], public togglerIcon?: string, public backgroundColor?: string){
        if(!this.togglerIcon) {
            this.togglerIcon = "navbar-toggler-icon";
        }
    }

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
    name:string;
    url: string;
    params?: string;
}