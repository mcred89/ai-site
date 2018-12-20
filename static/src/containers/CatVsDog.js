import React, { Component } from 'react';

export class CatVsDog extends Component {

    constructor(props) {
        super(props);
        this.state = {};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]: value});
    }

    handleSubmit(event) {
        this.setState({
            needsToFillOutForm: false
        });
    }

    render() {
        return (
            <div className="row">
            <div className="col-5"></div>
                <h1>To Do</h1>
            <div className="col-3"></div>
            </div>
           
        );
      }
    }
