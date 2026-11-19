export function score(rolls: number[]): number {
    if(rolls.length === 0)
        return 0;
    let score: number = 0;
    for(let i: number = 0; i < rolls.length; i++) {
        let rollCur: number = rolls[i]??0;
        let rollPrev: number = rolls[i-1]??0
        switch(rollCur) {
            case 5:
                if (rollPrev === 5 && i > 0) {
                    score += rollCur + rollPrev + 3;
                }
                break;
            case 10:
                score += rollCur * 2;
                break;
            default:
                score += rollCur;
                break;
        }
    }
    return score;
}