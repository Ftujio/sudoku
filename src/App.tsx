import React, { useEffect, useState } from 'react';
import './App.scss';
import { BigBoxProps } from './BigBox/BigBox';

import { BigRow, BigRowProps } from './BigRow/BigRow';
import { BoxProps } from './Box/Box';
import { RowProps } from './Row/Row';

function App() {
	const createBoxValues = (...values: number[]): BoxProps[] => values.map(value => ({ value }));
	const createRowValues = (...rowValues: number[][]): RowProps[] => rowValues.map(boxValues => ({ boxValues: createBoxValues(...boxValues) }))
	const createBigBoxValues = (...bigBoxValues: number[][][]): BigBoxProps[] => bigBoxValues.map(rowValues => ({ rowValues: createRowValues(...rowValues) }));

	const bigRowValue1: BigRowProps = {
		bigBoxValues: createBigBoxValues(
			[
				[0, 0, 0],
				[0, 0, 0],
				[0, 0, 0],
			],
			[
				[0, 0, 0],
				[0, 0, 0],
				[0, 0, 0],
			],
			[
				[0, 0, 0],
				[0, 0, 0],
				[0, 0, 0],
			],
		)
	};
	const bigRowValue2: BigRowProps = {
		bigBoxValues: createBigBoxValues(
			[
				[0, 0, 0],
				[0, 0, 0],
				[0, 0, 0],
			],
			[
				[0, 0, 0],
				[0, 0, 0],
				[0, 0, 0],
			],
			[
				[0, 0, 0],
				[0, 0, 0],
				[0, 0, 0],
			],
		)
	};
	const bigRowValue3: BigRowProps = {
		bigBoxValues: createBigBoxValues(
			[
				[0, 0, 0],
				[0, 0, 0],
				[0, 0, 0],
			],
			[
				[0, 0, 0],
				[0, 0, 0],
				[0, 0, 0],
			],
			[
				[0, 0, 0],
				[0, 0, 0],
				[0, 0, 0],
			],
		)
	};
	const emptyBigRowValues: BigRowProps[] = [
		bigRowValue1,
		bigRowValue2,
		bigRowValue3,
	];

	const [bigRowValues, setBigRowValues] = useState<BigRowProps[]>([]);

	const generatedData: number[][] = Array.from({ length: 9 }).map(() => Array.from({ length: 9}).map(() => 0));

	const getRandomInt = (min: number, max: number) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min) + min);
	};

	const generateSeed = (length: number): number[] => Array.from({ length }).map(n => getRandomInt(0, 10));

	const generateData = (array: number[][], numOfGenerated: number, seedLength: number = 100) => {
		const isValidNum = (n: number) => n >= 1 && n <= 9;
		const isValidCoordinate = (n: number) => n >= 0 && n <= 8;
		const getArrayColumn = (i: number) => array.map(x => x[i]);
		const rowDoesNotHaveNumber = (num: number, rowIndex: number) => !array[rowIndex].includes(num);
		const colDoesNotHaveNumber = (num: number, colIndex: number) => !getArrayColumn(colIndex).includes(num);
		const getCellAsArray = (rowIndex: number, colIndex: number): number[] => {
			const getBounds = (n: number): [number, number] => {
				let n1!: number;
				let n2!: number;

				const bounds = [[0, 2], [3, 5], [6, 8]];

				for (const [from, to] of bounds) {
					if (n >= from && n <= to) {
						n1 = from;
						n2 = to;
					}
				}

				return [n1, n2];
			};
			
			let cell: number[] = [];
			const [rowIndex1, rowIndex2] = getBounds(rowIndex);
			const [colIndex1, colIndex2] = getBounds(colIndex);

			for (let i = rowIndex1; i <= rowIndex2; i++) {
				cell.push(...array[i].slice(colIndex1, colIndex2 + 1));
			}

			return cell;
		};
		const cellDoesNotHaveNumber = (num: number, rowIndex: number, colIndex: number) => !getCellAsArray(rowIndex, colIndex).includes(num);
		
		let seed = generateSeed(seedLength);
		console.log('Generated seed:', seed.join(''));

		let totalIterations = 0;
		let seedIndex = 0;
		let i = 0;
		while (i < numOfGenerated) {
			if (!seed[seedIndex + 2]) {
				seed = generateSeed(seedLength);
				seedIndex = 0;
				console.log('Getting new seed:', seed.join(''));
			}
			
			const rowIndex: number = seed[seedIndex];
			const colIndex: number = seed[seedIndex + 1];
			const num: number = seed[seedIndex + 2];
			const isValid = isValidCoordinate(rowIndex) && isValidCoordinate(colIndex) && isValidNum(num);
			const isEmpty = isValid && array[rowIndex][colIndex] === 0;
			const canBePlaced = isEmpty && rowDoesNotHaveNumber(num, rowIndex) && colDoesNotHaveNumber(num, colIndex) && cellDoesNotHaveNumber(num, rowIndex, colIndex);

			if (canBePlaced) {
				array[rowIndex][colIndex] = num;
				i++;
			}

			seedIndex += 3;
			totalIterations++;
		}

		console.log(`Took ${totalIterations} iterations to add ${numOfGenerated} numbers`);
	};

	const mapToProps = (data: number[][]) => {
		let bigRowIndex = 0;
		let internalRowIndex = 0;

		for (let rowI = 0; rowI < data.length; rowI++) {
			if (rowI > 2) {
				bigRowIndex = 1;
			}
			if (rowI > 5) {
				bigRowIndex = 2;
			}

			let bigCellIndex = 0;
			let internalCellIndex = 0;
			const row = data[rowI];

			for (let colI = 0; colI < row.length; colI++) {
				if (colI > 2) {
					bigCellIndex = 1;
				}
				if (colI > 5) {
					bigCellIndex = 2;
				}

				const n = row[colI];
				emptyBigRowValues[bigRowIndex].bigBoxValues[bigCellIndex].rowValues[internalRowIndex].boxValues[internalCellIndex].value = n;

				if (internalCellIndex < 2) {
					internalCellIndex++;
				} else {
					internalCellIndex = 0;
				}
			}

			if (internalRowIndex < 2) {
				internalRowIndex++;
			} else {
				internalRowIndex = 0;
			}
		}
	};

	const run = () => {
		console.time('generating data took');
		generateData(generatedData, 50);
		console.timeEnd('generating data took');
		console.log(generatedData);
		mapToProps(generatedData);
		setBigRowValues(emptyBigRowValues);
	}

	useEffect(() => {
		setBigRowValues(emptyBigRowValues);
	}, []);

	return (
		<div className="App">
			<div className="buttons">
				<button onClick={run}>GENERATE</button>
			</div>

			<div className="board-container">
				<div className="board">
					{ bigRowValues.length &&
						<>
							<BigRow bigBoxValues={bigRowValues[0].bigBoxValues} />
							<BigRow bigBoxValues={bigRowValues[1].bigBoxValues} />
							<BigRow bigBoxValues={bigRowValues[2].bigBoxValues} />
						</>
					}
				</div>
			</div>
		</div>
	);
}

export default App;
