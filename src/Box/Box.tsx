import { useEffect, useState } from 'react';
import { useKeyPress } from '../useKeyPress';
import './Box.scss';

export const Box = (props: BoxProps) => {

	const [value, setValue] = useState<number>();
	const [selectedNumber, setSelectedNumber] = useState<number>();

	useKeyPress(key => {
		setSelectedNumber(key);
	});

	useEffect(() => {
		if (props.value !== undefined) {
			setValue(props.value);
		}
	}, [props.value]);

	const addNumber = () => {
		if (selectedNumber) {
			setValue(selectedNumber);
		}
	}

	return (
		<div className="box box-small" onClick={addNumber}>
			{ value! !== 0 &&
				value
			}
		</div>
	);
};

export interface BoxProps {
	value?: number;
}
