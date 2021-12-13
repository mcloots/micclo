import { Throw } from "@micclo/util-interface";

export function getClass(special: string, isDouble: boolean, isTriple: boolean): string {
    if (special === 'T' && isTriple) {
      return 'bg-success';
    }
    if (special === 'D' && isDouble) {
      return 'bg-success';
    }
    if (special === '25') {
      return 'bg-success';
    }
    if (special === '50') {
      return 'bg-danger';
    }
    return '';
}

export function selectSpecial(special: {ds: string, isDouble: boolean, isTriple: boolean, isGreenBull: boolean, isRedBull: boolean}): number | undefined  {
  switch (special.ds) {
    case 'D':
      special.isDouble = !special.isDouble;
      special.isTriple = false;
      break;
    case 'T':
      special.isTriple = !special.isTriple;
      special.isDouble = false;
      break;
    case '25':
      special.isGreenBull = true;
      return 25;
      break;
    case '50':
      special.isRedBull = true;
      return 50;
      break;
    default:
      break;
  }

  return undefined;
}

export function addThrowToTurn(thr: Throw, turnThrows: Throw[]): void {
  if (turnThrows.length < 3) {
    turnThrows.push(thr);
  }
}

export function formatThrowToStringRepresentation(thr: Throw): string {
  if (thr) {
    if (thr.isGreenBull) {
      return '25';
    }
    if (thr.isRedBull) {
      return '50';
    }
    if (thr.isDouble) {
      return 'D' + thr.points;
    }
    if (thr.isTriple) {
      return 'T' + thr.points;
    }
    if (thr.points) {
      return thr.points.toString();
    }
  }
  return '';
}

export function calculateScoreFromThrow(th: Throw): number {
  let score = th.points ?? 0;

  if (th.isDouble) {
    score *= 2;
  } else if (th.isTriple) {
    score *= 3;
  }

  return score;
}

export function getAverageTurnScore(turns: number[]): number {
  return turns.reduce((a,b) => a + b, 0) /turns.length;
}

export function endGame(turnScore: number, totalScore: number): boolean {
  if (totalScore - turnScore > 0) {
    return false;
  } else {
    return true;
  }
}
