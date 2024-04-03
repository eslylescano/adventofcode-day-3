import { sumAdjacentNumbers } from "../src";


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
