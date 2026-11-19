export function score(rolls: number[]): number {
    if(rolls.length === 0)
        return 0;
    let score: number = 0;
    let rollCount: number = 0;
    let frames: number = 10;
    for(let i: number = 0; i < frames; i++) {
        let first: number = rolls[rollCount]??0;
        let second: number = rolls[rollCount+1]??0;
        let third: number = rolls[rollCount+2]??0;

        if(first === 10){
            score += first + second + third;
            rollCount++;
        } else if(first + second === 10) {
            score += first + second + third;
            rollCount+=2;
            continue;
        } else {
            score += first + second;
            rollCount+=2;
        }
    }
    return score;
}