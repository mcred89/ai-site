import React, { Component } from 'react';
import * as tf from '@tensorflow/tfjs';


export class CatVsDog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            prediction: '',
            imageValue: null,
            displayImage: null,
            fileInput: React.createRef(),
            vgg16: tf.loadModel('https://s3-us-west-2.amazonaws.com/testing-models/headless_vgg16/model.json'),
            model: tf.loadModel('https://s3-us-west-2.amazonaws.com/testing-models/catvsdog_classifier/model.json')
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
        this.loadModels = this.loadModels.bind(this);
        this.predictImage = this.predictImage.bind(this);
        this.handleFile = this.handleFile.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.predictImage(this.state.src);
    }

    predictImage(img) {
        let response
        const tensor = tf.fromPixels(img);
        let meanImageNetRGB= tf.tensor1d([123.68,116.779,103.939]);
        const batched = tensor.sub(meanImageNetRGB).reverse(2).expandDims(0);
        let features = this.state.vgg16.predict(batched);
        let prediction = this.state.model.predict(features).as1D().argMax().dataSync()[0];
        if (prediction === 0 ) {
            response = 'Cat'
        } else if (prediction === 1 ) {
            response = 'Dog'
        }
        this.setState({
            prediction: response,
            displayImage: URL.createObjectURL(this.fileInput.current.files[0])
        });
        console.log('Prediction: ' + prediction)
    }

    handleFile(event) {
        let file = event.target.files[0]
        let reader = new FileReader()
        let self = this
        reader.onload = function(r){
            let img_obj = new Image()
            img_obj.src = r.target.result;
            img_obj.width = 150
            img_obj.height = 150
            self.setState({
                src: img_obj
            });
        }
        let read_file = reader.readAsDataURL(file);
        self.setState({ imageValue: read_file });
    }

    componentDidMount() {
        this.loadModels()
    }

    loadModels = async() => {
        this.setState({
            vgg16: await tf.loadModel('https://s3-us-west-2.amazonaws.com/ai-themcilroy-models/headless_vgg16/model.json'),
            model: await tf.loadModel('https://s3-us-west-2.amazonaws.com/ai-themcilroy-models/catvsdog_classifier/model.json')
        })
    }
    
    render() {
        return (

            <div>
                <div className="card bg-dark text-white m-5">
                <div className="card-header">
                    <h3>
                        Convolutional Neural Net classifer for cats and dogs. 
                    </h3>
                    <br/>
                    <p>
                        This was a fairly simple project.
                        The actual goal wasn't really a cat/dog classifier, but rather exploring slightly more advanced ML topics like:
                    </p>
                    <ul>
                        <li>Image (data) generation</li>
                        <li>Using pre-trained models</li>
                        <li>Tensorboard</li>
                        <li>Model export and use in tensorflowjs</li>
                    </ul>
                    <br/>
                    <h4>
                        Upload a picture of a cat or a dog.
                    </h4>
                </div>
                <form onSubmit={this.handleSubmit} className="card-body form-group">
                    <input type="file"
                        onChange={this.handleFile}
                        ref={this.fileInput}
                        accept="image/png, image/jpeg"/>
                    <br />
                    <button
                        type="submit"
                        className="button btn btn-primary mt-3">Submit</button>
                </form>
                {this.state.prediction === '' ? (<div/>) : (
                    <div className="card-footer">
                        <h5>Your picture, formatted for input into the network:</h5>
                        <img src={this.state.displayImage}
                            width="224" height="224" alt="alt"/>
                        <br/>
                        <h5 className="pt-2">Prediction: {this.state.prediction}</h5>
                        <a href="https://github.com/mcred89/ai-site/blob/master/static/src/containers/CatVsDog.js"
                            className="btn btn-secondary btn-lg" role="button" aria-disabled="true">See frontend code</a>
                        <a href="https://github.com/mcred89/JupyterNotebooks/blob/master/P4-practical-matters/practical-matters.ipynb"
                            className="btn btn-secondary btn-lg" role="button" aria-disabled="true">See machine learning code</a>
                    </div>
                )}
                </div>
            </div>
        );
      }
    }