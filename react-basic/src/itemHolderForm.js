import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { InputGroup, InputGroupAddon, InputGroupText, Input,Form,Button,FormGroup } from 'reactstrap';

export default class ItemSortHolderForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item:''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.onFormSubmit(this.state.item);
        this.setState({item: ''});
        ReactDOM.findDOMNode(this.refs.item).focus();
        return;
    }
    onChange(e){
        this.setState({
          item: e.target.value
        });
    }
    render() {
        return(
        <div className="item-sort-form">
            <Form className="holderTask" onSubmit={this.handleSubmit} inline>
                <FormGroup  className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type='text'placeholder="HolderList" ref='item'  onChange={this.onChange} value={this.state.item}/>
                     <Button color="primary">Add</Button>{' '}
                </FormGroup>
            </Form>
        </div>
        )
    }
}
