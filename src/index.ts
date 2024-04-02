export function parseGameInput(inputData: string[]): { [gameId: number]: { [color: string]: number }[][] } {
    const gamesData: { [gameId: number]: { [color: string]: number }[][] } = {};

    inputData.forEach(line => {
        const [gameIdString, cubesString] = line.split(": ");
        const gameId = parseInt(gameIdString.split(" ")[1]);
        const subsets = cubesString.split("; ").map(subset => {
            const counts = subset.split(", ");
            const cubeCount: { [color: string]: number } = {};
            counts.forEach(count => {
                const [num, color] = count.split(" ");
                cubeCount[color] = parseInt(num);
            });
            return cubeCount;
        });

        if (!(gameId in gamesData)) {
            gamesData[gameId] = [];
        }

        gamesData[gameId].push(subsets); 

    });

    return gamesData;
}

export function isPossibleGame(game: { [color: string]: number }[][], redLimit: number, greenLimit: number, blueLimit: number): boolean {
    for (const subsets of game) {
        for (const subset of subsets) {
            for (const color in subset) {
                const count = subset[color];
                if ((color === 'red' && count > redLimit) ||
                    (color === 'green' && count > greenLimit) ||
                    (color === 'blue' && count > blueLimit)) {
                    return false;
                }
            }
        }
    }
    return true;
}

export function possibleGamesSum(gamesData: { [gameId: number]: { [color: string]: number }[][] }, redLimit: number, greenLimit: number, blueLimit: number): number {
    let sum = 0;
    for (const gameId in gamesData) {
        if (isPossibleGame(gamesData[gameId], redLimit, greenLimit, blueLimit)) {
            sum += parseInt(gameId);
        }
    }
    return sum;
}


export function minCubesRequired(gamesData: { [gameId: number]: { [color: string]: number }[][] }): number {
    let sum = 0;

    for (const gameId in gamesData) {
        const game = gamesData[gameId];
        const minCounts: { [color: string]: number } = {};

        for (const subsets of game) {
            for (const subset of subsets) {
                for (const color in subset) {
                    const count = subset[color];
                    if (!(color in minCounts) || count > minCounts[color]) {
                        minCounts[color] = count;
                    }
                }
            }
        }

        const power = minCounts['red'] * minCounts['green'] * minCounts['blue'];
        sum += power;
    }

    return sum;
}


