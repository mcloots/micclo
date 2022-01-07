import { Throw } from "./throw";

export interface Player {
    id: string;
    name: string;
    score: number;
    throws: Throw[];
}