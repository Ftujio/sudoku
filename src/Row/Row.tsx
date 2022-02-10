import './Row.scss';

import { Box, BoxProps } from '../Box/Box';

export const Row = (props: RowProps) => {
	const [boxValue1, boxValue2, boxValue3] = props.boxValues;
	
	return (
		<div className="row big-row">
			<Box value={boxValue1.value} />
			<Box value={boxValue2.value} />
			<Box value={boxValue3.value} />
		</div>
	);
};

export interface RowProps {
	boxValues: BoxProps[];
}
