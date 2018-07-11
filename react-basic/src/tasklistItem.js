import React, { Component } from 'react';
import { ListGroup, ListGroupItem,Input } from 'reactstrap';

export default class TaskListItem extends Component {
    constructor(props) {
        super(props);
        this.changeHandler=this.changeHandler.bind(this);
        this.deleteHandler=this.deleteHandler.bind(this);
    }
    changeHandler(e) {
        this.setState({value:e.target.checked})
        this.props.children.isDone = e.target.checked;
    }
    deleteHandler(e) {
        this.props.onRemove(this.props.value);
    }
    render() {
        let checkedTask="line-through";
        if(!this.props.children.isDone)
           checkedTask ="none";
        return (
            <li data-id = {this.props.value} key = {this.props.value}><button type="button" className="close pull-right" aria-hidden="true" onClick={this.deleteHandler}>&times;</button> <Input type="checkbox" onChange={this.changeHandler}/><span style={{"textDecoration": checkedTask}}>{this.props.children.item}</span></li>
        )
    }
}
