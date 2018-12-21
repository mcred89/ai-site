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
            model: tf.loadModel('https://s3-us-west-2.amazonaws.com/testing-models/catvsdog_classifier/model.json')
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
        this.getImage = this.getImage.bind(this);
        this.cropImage = this.cropImage.bind(this);
        this.loadModels = this.loadModels.bind(this);
      }

      handleSubmit(event) {
        let response
        event.preventDefault();
        let image = this.getImage(this.fileInput.current.files[0]);
        let features = this.state.vgg16.predict(image);
        let predict = this.state.model.predict(features);
        if (predict === 1 ) {
            response = 'Cat'
        } else if (predict === 1 ) {
            response = 'Dog'
        }
        this.setState({
            prediction: response,
            loadedImage: URL.createObjectURL(this.fileInput.current.files[0])
        });
        console.log(image.shape)
        console.log(predict.toString())
      }

      cropImage(img) {
        const size = Math.min(img.shape[0], img.shape[1]);
        const centerHeight = img.shape[0] / 2;
        const beginHeight = centerHeight - (size / 2);
        const centerWidth = img.shape[1] / 2;
        const beginWidth = centerWidth - (size / 2);
        return img.slice([beginHeight, beginWidth, 0], [size, size, 3]);
      }

      getImage(img) {
        return tf.tidy(() => {
            let img_obj = new Image()
            img_obj.src = img
            img_obj.alt = 'alt'
            img_obj.width = 150
            img_obj.height = 150
            const image = tf.fromPixels(img_obj);
            const croppedImage = this.cropImage(image)
            const batchedImage = croppedImage.expandDims(0);
            return batchedImage
        });
      }
      componentDidMount() {
        this.loadModels();
      }

      loadModels = async() => {
        this.setState({
            vgg16: await tf.loadModel('https://s3-us-west-2.amazonaws.com/testing-models/headless_vgg16/model.json'),
            model: await tf.loadModel('https://s3-us-west-2.amazonaws.com/testing-models/catvsdog_classifier/model.json')
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
                        <img src={this.state.loadedImage} width="150" height="150" alt="alt"/>
                        <h3>{this.state.prediction}</h3>
                    </div>
                 )}
                </div>
                <div className="col-3"></div>
            </div>
        );
      }
    }



