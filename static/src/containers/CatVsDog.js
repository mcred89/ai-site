import React, { Component } from 'react';
//import CatOrDogOutput from '../components/PredictCatOrDog'
import * as tf from '@tensorflow/tfjs';

export class CatVsDog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            prediction: '',
            vgg16: tf.loadModel('https://s3-us-west-2.amazonaws.com/testing-models/headless_vgg16/model.json'),
            model: tf.loadModel('https://s3-us-west-2.amazonaws.com/testing-models/catvsdog_classifier/model.json')
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
        this.getImage = this.getImage.bind(this);
        this.loadModels = this.loadModels.bind(this);
      }

      handleSubmit(event) {
        event.preventDefault();
        this.loadModels();
        let image = this.getImage(this.fileInput.current.files[0]);
        console.log(image)
        console.log(this.state.vgg16)
        let features = this.state.vgg16.predict(image);
        let prediction = this.state.model.predict(features);
        this.setState({
            prediction: prediction
        });
        console.log(typeof prediction)

      }

      getImage(img) {
        return tf.tidy(() => {
            let img_obj = new Image()
            img_obj.src = img
            img_obj.alt = 'alt'
            img_obj.width = 150
            img_obj.height = 150
            const image = tf.fromPixels(img_obj);
            const batchedImage = image.expandDims(0);
            return batchedImage.toFloat().div(255).sub(1);
        });
      }
      componentDidMount() {
        this.loadModels();
      }

      loadModels = async() => {
        this.setState({
            vgg16: await tf.loadModel('https://s3-us-west-2.amazonaws.com/testing-models/headless_vgg16/model.json'),
            model: await tf.loadModel('https://s3-us-west-2.amazonaws.com/testing-models/catvsdog_classifier/model.json')
            //vgg16: await tf.loadModel('../../models/headless_vgg16/model.json'),
            //model: await tf.loadModel('../../models/catvsdog_classifier/model.json')
        })
        console.log(this.state.vgg16)
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
                </div>
                <div className="col-3"></div>
            </div>
        );
      }
    }



