import './BigBox.scss';

import { Row, RowProps } from "../Row/Row";

export const BigBox = (props: BigBoxProps) => {
	const [rowValue1, rowValue2, rowValue3] = props.rowValues;

	return (
		<div className="box box-big">
			<Row boxValues={rowValue1.boxValues} />
			<Row boxValues={rowValue2.boxValues} />
			<Row boxValues={rowValue3.boxValues} />
		</div>
	);
}

export interface BigBoxProps {
	rowValues: RowProps[];
}
