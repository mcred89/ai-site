import React, { Component } from 'react';
import CatOrDogOutput from '../components/PredictCatOrDog'

export class CatVsDog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: '',
            needsToFillOutForm: true
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
      }
      handleSubmit(event) {
        event.preventDefault();
        this.setState({
            needsToFillOutForm: false,
            file: this.fileInput.current.files[0]
        });
      }
    
      render() {
        return (
            <div className="row">
                <div className="col-5"></div>
                <div className="card bg-dark text-white m-5">
                <form onSubmit={this.handleSubmit} className="card-body form-group">
                    <input type="file" ref={this.fileInput} />
                    <br />
                    <button
                        type="submit"
                        className="button btn btn-primary mt-3">Submit</button>
                </form>
                <div className="card-footer">
                    <CatOrDogOutput image={this.state.file}/>
                </div>
                </div>
                <div className="col-3"></div>
            </div>
        );
      }
    }



