import React, { Component } from 'react';
import * as tf from '@tensorflow/tfjs';


export class CatVsDog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            prediction: '',
            imageValue: null,
            fileInput: React.createRef(),
            vgg16: tf.loadModel('https://s3-us-west-2.amazonaws.com/testing-models/headless_vgg16/model.json'),
            model: tf.loadModel('https://s3-us-west-2.amazonaws.com/testing-models/catvsdog_classifier2/model.json')
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
        this.getImage = this.getImage.bind(this);
        this.loadModels = this.loadModels.bind(this);
        this.predictImage = this.predictImage.bind(this);
        this.handleFile = this.handleFile.bind(this);
      }

      handleSubmit(event) {
        event.preventDefault();
        this.getImage(this.state.src);

      }

      predictImage(image) {
        let features = this.state.vgg16.predict(image);
        let predict = this.state.model.predict(features);
        return predict
      }

      getImage(img) {
        let response
        let img_obj = new Image()
        img_obj.src = img;
        console.log(img_obj)
        img_obj.width = 150
        img_obj.height = 150
        const tensor = tf.fromPixels(img_obj);
        let meanImageNetRGB= tf.tensor1d([123.68,116.779,103.939]);
        const batched = tensor.sub(meanImageNetRGB).reverse(2).expandDims(0);
        const prediction = this.predictImage(batched).as1D().argMax().dataSync()[0]
        if (prediction === 0 ) {
            response = 'Cat'
        } else if (prediction === 1 ) {
            response = 'Dog'
        }
        this.setState({
            prediction: response,
            loadedImage: URL.createObjectURL(this.fileInput.current.files[0])
        });
        console.log(prediction)
        return batched
      }

      handleFile(event) {
        console.log('handleFile')
        let file = event.target.files[0]
        let reader = new FileReader()
        let self = this
        reader.onload = function(r){
            self.setState({
                src: r.target.result
            });
        }
        let read_file = reader.readAsDataURL(file);
        self.setState({imageValue:read_file});

      }


      componentDidMount() {
        this.loadModels()
      }

      loadModels = async() => {
        this.setState({
            vgg16: await tf.loadModel('https://s3-us-west-2.amazonaws.com/testing-models/headless_vgg16/model.json'),
            model: await tf.loadModel('https://s3-us-west-2.amazonaws.com/testing-models/catvsdog_classifier2/model.json')
        })
        }
    
      render() {
        return (
            <div className="row">
                <div className="col-5"></div>
                <div className="card bg-dark text-white m-5">
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
                        <img src={this.state.src}
                            width="224" height="224" alt="alt"/>
                        <h3>{this.state.prediction}</h3>
                    </div>
                 )}
                </div>
                <div className="col-3"></div>
            </div>
        );
      }
    }



