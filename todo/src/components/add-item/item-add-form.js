import React, {Component} from 'react';

import './item-add-form.css';

export default class ItemAddForm extends Component{

    state = {
        label: ''
    }
    
    onLabelChange = (e) => {
        this.setState ({
            label: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addItem(this.state.label);
        this.setState({
            label: ''
        })
    };

    render(){
        return(
            <form className="item-add-form"
            onSubmit={this.onSubmit}>

            <input type="text" className="from-control"
            onChange={this.onLabelChange}
            placeholder="what"
            value= {this.state.label}></input>
                <button className="btn btn-outline-secondary">addItem</button>
            </form>
        );
    };
};

