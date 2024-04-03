interface NumberIndex {
    number: number;
    indices: [number, number];
}

function findNumberIndex(str: string): NumberIndex[] {
    const regex: RegExp = /\d+/g;
    let match: RegExpExecArray | null;
    const results: NumberIndex[] = [];

    while ((match = regex.exec(str)) !== null) {
        const number: number = parseInt(match[0]); // Convert string to number
        const startIndex: number = match.index;
        const endIndex: number = startIndex + match[0].length - 1;
        results.push({ number, indices: [startIndex, endIndex] });
    }

    return results;
}

export function sumAdjacentNumbers(engineSchematic: string[]): number {
    const splitSchematicInput = splitSchematic(engineSchematic);

    let totalSum: number = 0;
    for (let row = 0; row < engineSchematic.length; row++) {
        let numbersIndex = findNumberIndex(engineSchematic[row]);
        for (let { number, indices } of numbersIndex) {
            if (hasAdjacentSymbolNumber(splitSchematicInput, row, indices)) {
                totalSum += number;
            }
        }
    }

    return totalSum;
}



function splitSchematic(schematic: string[]): string[][] {
    const result: string[][] = [];

    for (let row of schematic) {
        result.push(row.split(''));
    }

    return result;
}

function hasAdjacentSymbolNumber(array: string[][], row: number, columnIndices: number[]): boolean {
    for (let colIndex of columnIndices) {
        if (hasAdjacentSymbol(array, row, colIndex)) {
            return true;
        }
    }
    return false;
}



function hasAdjacentSymbol(array: string[][], rowIndex: number, colIndex: number): boolean {
    const numRows = array.length;
    const numCols = array[0].length;

    const offsets: number[][] = [
        [-1, 0], // Up
        [1, 0],  // Down
        [0, -1], // Left
        [0, 1],  // Right
        [-1, -1], // Diagonal: Up-Left
        [-1, 1],  // Diagonal: Up-Right
        [1, -1],  // Diagonal: Down-Left
        [1, 1]    // Diagonal: Down-Right
    ];

    for (const [offsetRow, offsetCol] of offsets) {
        const neighborRow = rowIndex + offsetRow;
        const neighborCol = colIndex + offsetCol;

        if (neighborRow >= 0 && neighborRow < numRows && neighborCol >= 0 && neighborCol < numCols) {
            const neighbor = array[neighborRow][neighborCol];

            if (neighbor === '*' || neighbor === '#' || neighbor === '+' || neighbor === '$') {
                return true;
            }
        }
    }

    return false; 
}


