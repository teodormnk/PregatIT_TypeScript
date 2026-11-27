export function score(rolls: number[]): number {
    if(rolls.length === 0)
        return 0;
    let score: number = 0;
    let rollCount: number = 0;
    const frames: number = 10;
    for(let i: number = 0; i < frames; i++) {
        const first: number = rolls[rollCount]??0;
        const second: number = rolls[rollCount+1]??0;
        const third: number = rolls[rollCount+2]??0;

        if(first === 10){
            score += first + second + third;
            rollCount++;
        } else if(first + second === 10) {
            score += first + second + third;
            rollCount+=2;
        } else {
            score += first + second;
            rollCount+=2;
        }
    }
    return score;
}