import { sumAdjacentNumbers } from "../src";
import * as fs from 'fs';
import * as path from 'path';
const currentDir = path.dirname(__filename);
const filePath = path.join(currentDir, 'input.txt');

describe('sumAdjacentNumbers', () => {
    test('example engine schematic', () => {
        const schematic = [
            '467..114..',
            '...*......',
            '..35..633.',
            '......#...',
            '617*......',
            '.....+.58.',
            '..592.....',
            '......755.',
            '...$.*....',
            '.664.598..'
        ];
        expect(sumAdjacentNumbers(schematic)).toBe(4361);
    });

    test('empty engine schematic', () => {
        const schematic: string[] = [];
        expect(sumAdjacentNumbers(schematic)).toBe(0);
    });

    test('no numbers adjacent to symbols', () => {
        const schematic = [
            '........',
            '........',
            '........',
            '........',
            '........',
            '........',
            '........',
            '........',
            '........'
        ];
        expect(sumAdjacentNumbers(schematic)).toBe(0);
    });

});

describe('Calculate sum of all of the part numbers', () => {
    it('handles the input file', () => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading the file:', err);
                return;
            }
            const lines = data.split('\n');
            const sum = sumAdjacentNumbers(lines);
            expect(sum).toBeDefined();
            console.log(sum);
        });
      });
  })
