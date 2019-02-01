import React, { Component } from 'react';
import * as tf from '@tensorflow/tfjs';
import { tweet_word_lookup } from '../data/tweet_dict_reverse'

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
        this.reweightWord = this.reweightWord.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.generateTweet();
    }

    reweightWord(preds, temperature) {
        return tf.tidy(() => {
          const logPreds = tf.div(tf.log(preds), temperature);
          const expPreds = tf.exp(logPreds);
          const sumExpPreds = tf.sum(expPreds);
          preds = tf.div(expPreds, sumExpPreds);
          return tf.multinomial(preds, 1, null, true).dataSync()[0];
        })
    }


    generateTweet() {
        // Basis for this function:
        // https://github.com/tensorflow/tfjs-examples/blob/master/lstm-text-generation/index.js#L147
        const temperature = tf.scalar(0.5);
        const length = 20
        let outputTweet = '';
        const trainingLength = 3;
        // Need to download dict and get length + 1 for numberOfWords
        const reverseLookup = tweet_word_lookup;
        const numberOfWords = Object.keys(reverseLookup).length + 1;
        const inputWords = new tf.TensorBuffer([1, trainingLength, numberOfWords]);
        for (let i = 0; i < trainingLength; ++i) {
            let index = Math.floor((Math.random() * numberOfWords) + 1);
            inputWords.set(1, 0, i, index[i]);
        }
        let input = inputWords.toTensor();
        for (let i = 0; i < length; ++i) {
            let prediction = this.state.model.predict(input)
            const wordIndex = this.reweightWord(tf.squeeze(prediction), temperature);
            // Need to download dict and use to lookup word. getWord is just filler.
            const word = reverseLookup[wordIndex];
            outputTweet += word;
            input = input.slice(1);
            input.push(wordIndex);
        }
        this.setState({
            tweet: outputTweet
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