import { isPossibleGame, minCubesRequired, parseGameInput, possibleGamesSum } from "../src";
import * as fs from 'fs';
import * as path from 'path';
const currentDir = path.dirname(__filename);
const filePath = path.join(currentDir, 'input.txt');

describe('Cube Conundrum', () => {
    const input_data: string[] = [
        "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
        "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
        "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
        "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
        "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green"
    ];

    test('Parsing game input', () => {
        const games = parseGameInput(input_data);
        expect(Object.keys(games).length).toBe(5);
    });

    test('Checking possible games', () => {
        const games = parseGameInput(input_data);
        const redLimit = 12;
        const greenLimit = 13;
        const blueLimit = 14;
        expect(isPossibleGame(games[1], redLimit, greenLimit, blueLimit)).toBe(true);
        expect(isPossibleGame(games[2], redLimit, greenLimit, blueLimit)).toBe(true); // Game 2 should be possible
        expect(isPossibleGame(games[3], redLimit, greenLimit, blueLimit)).toBe(false);
        expect(isPossibleGame(games[4], redLimit, greenLimit, blueLimit)).toBe(false);
        expect(isPossibleGame(games[5], redLimit, greenLimit, blueLimit)).toBe(true); // Game 5 should be possible
    });

    test('Summing possible games IDs', () => {
        const games = parseGameInput(input_data);
        const redLimit = 12;
        const greenLimit = 13;
        const blueLimit = 14;
        const sum = possibleGamesSum(games, redLimit, greenLimit, blueLimit);
        expect(sum).toBe(8);
    });
});

describe('Calculate number value', () => {
  it('handles the input file', () => {
      fs.readFile(filePath, 'utf8', (err, data) => {
          if (err) {
              console.error('Error reading the file:', err);
              return;
          }
          const lines = data.split('\n');
          const games = parseGameInput(lines);
          const redLimit = 12;
          const greenLimit = 13;
          const blueLimit = 14;
          const sum = possibleGamesSum(games, redLimit, greenLimit, blueLimit);
          expect(sum).toBeDefined();
          console.log(sum);

          const minCubesRequiredVal = minCubesRequired(games);
          console.log(minCubesRequiredVal);
      });
    });
})



describe('Cube Conundrum - Part Two', () => {
    const input_data: string[] = [
        "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
        "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
        "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
        "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
        "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green"
    ];

    test('Finding minimum set of cubes required', () => {
        const gamesData = parseGameInput(input_data);
        expect(minCubesRequired(gamesData)).toBe(2286);
    });

    test('Minimum set of cubes for individual games', () => {
        const gamesData = parseGameInput(input_data);
        const minCubes = [
            48,  
            12,  
            1560,  
            630,  
            36   
        ];
        for (let i = 1; i <= 5; i++) {
            expect(minCubesRequired({[i]: gamesData[i]})).toBe(minCubes[i - 1]);
        }
    });
});

