import React from 'react';

const PredictCatOrDog = (props) => {
    let image = props.image;

    return image.name
}

const CatOrDogOutput = (props) => (
    <div>
        <h3>{PredictCatOrDog(props)}</h3>
    </div>
)

export default CatOrDogOutput;