import React from 'react';
import PropTypes from 'prop-types';

const RadioOrCheckGroup = (props) => (
	<div>
		<h2>{props.title}</h2>
		<div onChange={props.controlFunc}>
			{props.options.map(option => {
				return (
					<label key={option} className="btn btn-secondary">
						<input
							className="form-checkbox"
							required
							name={props.setName}
							value={option}
							type={props.type} /> {option}
					</label>
				);
			})}
		</div>
	</div>
);

RadioOrCheckGroup.propTypes = {
	title: PropTypes.string.isRequired,
	type: PropTypes.oneOf(['checkbox', 'radio']).isRequired,
	setName: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
	controlFunc: PropTypes.func.isRequired
};

export default RadioOrCheckGroup;