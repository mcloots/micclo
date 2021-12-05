export interface Game {
    id: string;
    gameType: GameType;
    doubleOut: boolean; // is double out required
    player1: string; // player 1 id
    player2: string | undefined; // you can play on your own
    scoreP1: number; // score of player 1
    scoreP2: number; // score of player 2
    startingPlayer: number; // 1 for player 1, 2 for player 2
}

// only allow these game types by using TS Template Literal Types (TLT)
type GameType = "701" | "501" | "301" | "101";