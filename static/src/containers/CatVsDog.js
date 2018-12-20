import React, { Component } from 'react';
import ImageInput from '../components/ImageInput';

export class CatVsDog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: ''
        };

        this.handleFile = this.handleFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFile(event) {
        var reader = new FileReader();
        var file = event.target.files[0];
        
        reader.onloadend = () => {
            this.setState({
              file: file,
              imagePreviewUrl: reader.result
            })
        }
        
        reader.readAsDataURL(file);
    }

    handleSubmit(event) {
        event.preventDeafault();
    }

    render() {
        return (
            <div className="row">
            <div className="col-5"></div>
                <form 
                    className="form-group card bg-dark text-white mt-5"
                    onSubmit={this.handleSubmit}
                    encType="multipart/form-data">
                <ImageInput
                    name={'maxSquat'}
                    clickFunc={this.handleFile} />
                <button
                    type="submit"
                    className="button btn btn-primary mt-3">Submit</button>
                </form>
            <div className="col-3"></div>
            </div>
           
        );
      }
    }
