import React from 'react';
import * as tf from '@tensorflow/tfjs';

function getImage(img) {
    return tf.tidy(() => {
        let img_obj = new Image()
        img_obj.src = img
        img_obj.alt = 'alt'
        img_obj.width = 150
        img_obj.height = 150
        const image = tf.fromPixels(img_obj);
        //const croppedImage = cropImage(image);
        //const batchedImage = image.expandDims(0);
        //return batchedImage.toFloat().div(255).sub(1);
        return image
    });
  }

function cropImage(img) {
    const width = img.shape[0];
    const height = img.shape[1];

    const shorterSide = Math.min(img.shape[0], img.shape[1]);
    
    const startingHeight = (height - shorterSide) / 2;
    const startingWidth = (width - shorterSide) / 2;
    const endingHeight = startingHeight + shorterSide;
    const endingWidth = startingWidth + shorterSide;
    
    const cropped = img.slice([startingWidth, startingHeight, 0], [endingWidth, endingHeight, 3])
    return tf.image.resizeBilinear(cropped, [150, 150]);
}

componentDidMount() {
    this.renderPosts();
  }

async function predictions(image) {
    //const sized_image = cropImage(image)
    //const vgg16 = tf.loadModel('https://s3-us-west-2.amazonaws.com/testing-models/headless_vgg16/model.json');
    const vgg16 = await tf.loadModel('../../models/headless_vgg16/model.json');
    //const model = tf.loadModel('https://s3-us-west-2.amazonaws.com/testing-models/catvsdog_classifier/model.json');
    const model = await tf.loadModel('../../models/catvsdog_classifier/model.json');

    let features = vgg16.predict(image)
    let prediction = model.predict(features);
    console.log('PREDCIT:' + prediction)

    return prediction
}

const PredictCatOrDog = (props) => {
    if ( props.file !== null ) {
        const image = getImage(props.file)
        const predict = predictions(image)
        return predict
    } else {
        return ''
    }
}

const CatOrDogOutput = (props) => (
    <div>
        <h3>{PredictCatOrDog(props)}</h3>
    </div>
)

export default CatOrDogOutput;