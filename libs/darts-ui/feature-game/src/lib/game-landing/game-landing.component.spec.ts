import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameLandingComponent } from './game-landing.component';

describe('GameLandingComponent', () => {
  let component: GameLandingComponent;
  let fixture: ComponentFixture<GameLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameLandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
