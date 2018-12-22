import React, { Component } from 'react';
//import CatOrDogOutput from '../components/PredictCatOrDog'
import * as tf from '@tensorflow/tfjs';

export class CatVsDog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            prediction: '',
            loadedImage: null,
            vgg16: tf.loadModel('https://s3-us-west-2.amazonaws.com/testing-models/headless_vgg16/model.json'),
            model: tf.loadModel('https://s3-us-west-2.amazonaws.com/testing-models/catvsdog_classifier224/model.json')
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
        this.getImage = this.getImage.bind(this);
        this.loadModels = this.loadModels.bind(this);
        this.predictImage = this.predictImage.bind(this);
      }

      handleSubmit(event) {
        let response
        event.preventDefault();
        const image = this.getImage(this.fileInput.current.files[0]);
        const prediction = this.predictImage(image)
        if (prediction === 1 ) {
            response = 'Cat'
        } else if (prediction === 1 ) {
            response = 'Dog'
        }
        this.setState({
            prediction: response,
            loadedImage: URL.createObjectURL(this.fileInput.current.files[0])
        });
        console.log(prediction.dataSync()[0])
      }

      predictImage(image) {
        let features = this.state.vgg16.predict(image);
        let predict = this.state.model.predict(features);
        return predict
      }

      getImage(img) {
        return tf.tidy(() => {
            let img_obj = new Image()
            img_obj.src = img
            img_obj.width = 224
            img_obj.height = 224
            const tensor = tf.fromPixels(img_obj).toFloat();
            const offset = tf.scalar(1/225);
            const normalized = tensor.mul(offset);
            const batched = normalized.reshape([1, 224, 224, 3]);
            return batched
        });
        //const croppedImage = this.cropImage(image)
        //const batchedImage = croppedImage.expandDims(0);
        //return batchedImage
      }

      componentDidMount() {
        this.loadModels()
      }

      loadModels = async() => {
        this.setState({
            vgg16: await tf.loadModel('https://s3-us-west-2.amazonaws.com/testing-models/headless_vgg16/model.json'),
            model: await tf.loadModel('https://s3-us-west-2.amazonaws.com/testing-models/catvsdog_classifier224/model.json')
        })
        }
    
      render() {
        return (
            <div className="row">
                <div className="col-5"></div>
                <div className="card bg-dark text-white m-5">
                <form onSubmit={this.handleSubmit} className="card-body form-group">
                    <input type="file" ref={this.fileInput} accept="image/png, image/jpeg"/>
                    <br />
                    <button
                        type="submit"
                        className="button btn btn-primary mt-3">Submit</button>
                </form>
                {this.state.prediction === '' ? (<div/>) : (
                    <div className="card-footer">
                        <img src={this.state.loadedImage} width="224" height="224" alt="alt"/>
                        <h3>{this.state.prediction}</h3>
                    </div>
                 )}
                </div>
                <div className="col-3"></div>
            </div>
        );
      }
    }



