import React, { Component } from 'react';
import * as tf from '@tensorflow/tfjs';


export class Tweeter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tweet: '',
            model: tf.loadModel('https://s3-us-west-2.amazonaws.com/ai-themcilroy-models/trump_tweeter/model.json')
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadModels = this.loadModels.bind(this);
        this.generateTweet = this.generateTweet.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.generateTweet();
    }

    generateTweet() {
        let response
        this.setState({
            tweet: response
        });
        console.log('Tweet: ' + this.state.tweet)
    }

    componentDidMount() {
        this.loadModels()
    }

    loadModels = async() => {
        this.setState({
            model: await tf.loadModel('https://s3-us-west-2.amazonaws.com/ai-themcilroy-models/trump_tweeter/model.json')
        })
    }
    
    render() {
        return (

            <div>
                <div className="card bg-dark text-white m-5">
                <div className="card-header">
                    <h3>
                        LSTM text generator trained on President Trump's tweets. 
                    </h3>
                    <br/>
                    <p>
                        This page isn't meant this as political support or disapproval.
                        President Trump is an interesting random text generation subject for a few reasons.
                        First, these types of RNNs aren't interesting when outputting a large amount of data.
                        They tend to be better suited to smaller outputs.
                        Trump has a massive corpus of short writings (tweets) to train on that are around the lenth we want for our outputs.
                        Second, he has a distinctive style.
                    </p>
                    <br/>
                    <p>
                        Don't expect actual sentences or thoughts out of this generator.
                        It's meant simply to mimic his general style of speech.
                    </p>
                    <br/>
                    <h4>
                        Click Submit to get a random Tweet from a model trained on President Trump's Twitter
                    </h4>
                </div>
                <form onSubmit={this.handleSubmit} className="card-body form-group">
                    <button
                        type="submit"
                        className="button btn btn-primary mt-3">Submit</button>
                </form>
                {this.state.tweet === '' ? (<div/>) : (
                    <div className="card-footer">
                        <h5>Your Random Tweet:</h5>
                        <h5 className="pt-2">{this.state.tweet}</h5>
                        <a href="https://github.com/mcred89/ai-site/blob/master/static/src/containers/Tweeter.js"
                            className="btn btn-secondary btn-lg" role="button" aria-disabled="true">See frontend code</a>
                        <a href="https://github.com/mcred89/notebooks/blob/master/P5-text-gen-lstm-hyperas/text-gen-lstm-hyperas-1.ipynb"
                            className="btn btn-secondary btn-lg" role="button" aria-disabled="true">See machine learning code</a>
                    </div>
                )}
                </div>
            </div>
        );
      }
    }