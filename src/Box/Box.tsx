import './Box.scss';

export const Box = (props: BoxProps) => {
	return (
		<div className="box box-small">
			{ props.value !== 0 &&
				props.value
			}
		</div>
	);
};

export interface BoxProps {
	value?: number;
}
