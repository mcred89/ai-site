import React from 'react';
import PropTypes from 'prop-types';

const NumberInput = (props) => (
	<div className="form-group">
		<input
			className="form-control"
			type='number'
			required
			name={props.name}
			value={props.content}
			onChange={props.controlFunc}
			placeholder={props.placeholder} 
			min={props.min}
			max={props.max} />
	</div>
);

NumberInput.propTypes = {
	name: PropTypes.string.isRequired,
	controlFunc: PropTypes.func.isRequired,
	content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	placeholder: PropTypes.string,
	min: PropTypes.number,
	max: PropTypes.number,
};

export default NumberInput;