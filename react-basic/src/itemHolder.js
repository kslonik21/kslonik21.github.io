import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class ItemSortHolder extends Component {
    constructor(props) {
        super(props);
        this.changeHolderList = this.changeHolderList.bind(this);
        this.checkActive = this.checkActive.bind(this);
    }
        changeHolderList(e) {
            this.props.onSelected( e.currentTarget.dataset.id)
        }
        checkActive(i) {
            if (i == this.props.selectedID) {
                return "list-group-item active";
            }
            else {
                return "list-group-item ";
            }
        }
        render() {
            var selectedID = this.props.selectedID;
            var allitems = this.props.Todos;
            return <div className="list-group">
        {
            allitems.map(function(item,i){
            var _class = "";
            if (i == this.props.selectedID)
            {
                _class =  "list-group-item active";
            }
            else
            {
                _class =  "list-group-item ";
            }
            return(
                 <a href="#" key={i} data-id={i} className={_class} onClick={this.changeHolderList} ><span className="badge" >{item.items.length}</span>{item.name}</a>
            )
        },this)}</div>;
        }
}
