export function sumAdjacentNumbers(engineSchematic: string[]): number {
    const pattern: RegExp = /\d+/g;

    let totalSum: number = 0;

    for (let row of engineSchematic) {
        const matches: RegExpMatchArray | null = row.match(pattern);
        if (matches) {
            for (let match of matches) {
                totalSum += parseInt(match);
            }
        }
    }

    return totalSum;
}