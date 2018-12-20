import React from 'react';

const ImageInput = (props) => (
	<div className="form-group">
		<input
			className="form-control"
			type='file'
			required
			onClick={props.clickFunc}/>
	</div>
);

export default ImageInput;