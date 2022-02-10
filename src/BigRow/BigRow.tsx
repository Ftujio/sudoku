import './BigRow.scss';

import { BigBox, BigBoxProps } from '../BigBox/BigBox';

export function BigRow(props: BigRowProps) {
	const [bigBoxValue1, bigBoxValue2, bigBoxValue3] = props.bigBoxValues;

	return (
		<div className="row row-big">
			<BigBox rowValues={bigBoxValue1.rowValues} />
			<BigBox rowValues={bigBoxValue2.rowValues} />
			<BigBox rowValues={bigBoxValue3.rowValues} />
		</div>
	);
}

export interface BigRowProps {
	bigBoxValues: BigBoxProps[];
}
