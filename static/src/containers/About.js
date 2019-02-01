import React, { Component } from 'react';

export class About extends Component {
    render() {
        return (
            <div className="text-white m-5">
                <h2>Welcome!</h2>
                    This site hosts machine learning models, is written in ReactJS and TensorflowJS, and is hosted as an AWS S3 static site.
                <br/>
                <p>
                    The intention of this site is to practice javascript and learn how to run tensorflow models in the broswer.
                    The original plan was to have 2 models, then slowly add models as I worked on other project.
                    The first model, which classifies pictures as cats or dogs, is currently available.
                    The second model was meant to be an LSTM test generator.
                    While I do have a functioning model, tensorlfowjs doesn't support all of the keras layers that my model uses. 
                </p>
                <br/>
                <p>
                    I've other projects I need to move on to at this point, but hopefully I'll be able to revisit this site and add some more models in the future.
                    Feel free to check out the site code, or all of my ML notebooks below.
                    I recomend checking out the serverless CI/CD pipeline that's included in the site code.
                </p>
                <a href="https://github.com/mcred89/notebooks"
                    className="btn btn-secondary btn-lg" role="button" aria-disabled="true">See machine learning code</a>
                <a href="https://github.com/mcred89/ai-site"
                    className="btn btn-secondary btn-lg" role="button" aria-disabled="true">See frontend code</a>
            </div>
        )
    }
}