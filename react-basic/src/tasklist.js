import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import TaskListItem from './tasklistItem';
import styled from 'styled-components';
const List = styled.ul`
    margin-top: 50px;
    `;
export default class TaskList extends Component {
    constructor(props) {
        super(props);
        this.removeTask=this.removeTask.bind(this);
    }
    removeTask(e) {
        this.props.onDelete(e);
    }
    render() {
        let createItem = (itemText,i) => {
        return  (

            <ListGroupItem className="list-item">
                <TaskListItem key={i} value={i} onRemove={this.removeTask}>{itemText}</TaskListItem>
            </ListGroupItem>
        )
        }
        let allitems = this.props.items;
        let status = this.props.filter[0].Status;
        if(status=='false') {
            allitems = allitems.filter(t => !t.isDone)
        }
        else if(status=='true') {
            allitems = allitems.filter(t => t.isDone)
        }
        let searchText = this.props.filter[0].keyword;

        if(searchText) {
            let searchResult = [];
            allitems.forEach(function(item){
                if(item.item.toLowerCase().indexOf(searchText)!=-1)
                searchResult.push(item);
            });
            return <ul>{searchResult.map(createItem,this)}</ul>;
        }
      return <ul>{allitems.map(createItem,this)}</ul>
    }
}
