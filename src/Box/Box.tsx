import { useEffect, useState } from 'react';
import { useKeyPress } from '../useKeyPress';
import './Box.scss';

export const Box = (props: BoxProps) => {

	const [value, setValue] = useState<string>();
	const [selectedNumber, setSelectedNumber] = useState<number>();

	useKeyPress(key => {
		setSelectedNumber(key);
	});

	useEffect(() => {
		if (props.value !== undefined) {
			const newValue = props.value === 0 ? '' : props.value.toString();
			setValue(newValue);
		}
	}, [props.value]);

	const addNumber = () => {
		if (selectedNumber) {
			setValue(selectedNumber.toString());
		}
	}

	return (
		<div className="box box-small" onClick={addNumber}>
			{ value }
		</div>
	);
};

export interface BoxProps {
	value?: number;
}
