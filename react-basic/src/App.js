import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import Title from './title';
import AddTaskForm from './taskform';
import TaskList from './tasklist';
import TaskListItem from './tasklistItem';
import SearchAndFilter from './searchItem';
import ItemSortHolderForm from './itemHolderForm';
import ItemSortHolder from './itemHolder';


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            HolderList:[{name:"Stage #1",items:[{item:'Brackets',isDone:true},{item:'Product',isDone:true},{item:'Zeros',isDone:true},{item:'Doubly linked list',isDone:true},{item:'Guessing game',isDone:true},{item:'TicTacToe',isDone:true},
            {item:'FiniteStateMachine',isDone:true}
        ]},{name:"Stage #2",items:[{item:'Positions and floats',isDone:true},{item:'Match Game',isDone:true},{item:'Todo itmd #3',isDone:true},{item:'CSS Recipes and Layouts',isDone:true},{item:'Game',isDone:true}
    ]},{name:"Stage #3",items:[{item:'React Basic',isDone:true}]}],filter:[{keyword:'',Status:"SHOW_ALL"}],selectedHolderList:"0"
        }
        this.updateItems = this.updateItems.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.filterItem = this.filterItem.bind(this);
        this.searchItem = this.searchItem.bind(this);
        this.addHolderList = this.addHolderList.bind(this);
        this.selectedList = this.selectedList.bind(this);
    }

    updateItems(newItem) {
        let item = {item:newItem,isDone:false};
        let newHolderList = this.state.HolderList;
        let allItems = this.state.HolderList[this.state.selectedHolderList].items.concat([item]);
        newHolderList[this.state.selectedHolderList].items = allItems;
        this.setState({HolderList: newHolderList})
    }
    deleteItem(index) {
        let newHolderList = this.state.HolderList;
        let allItems = this.state.HolderList[this.state.selectedHolderList].items.slice();
        allItems.splice(index, 1);
        newHolderList[this.state.selectedHolderList].items = allItems;
        this.setState({HolderList: newHolderList})
    }
    filterItem(e) {
        this.state.filter[0].Status = e.target.value;
        this.setState({
            filter: this.state.filter
        });
    }
    searchItem(e) {
        this.state.filter[0].keyword = e.target.value;
        this.setState({
            filter: this.state.filter
        });
    }
    addHolderList(newList) {
        let list = {name:newList,items:[{item:'',isDone:false}]};
        let newHolderList = this.state.HolderList.concat([list]);
        this.setState({
        HolderList: newHolderList
    });
    }
    selectedList(index) {
        this.state.selectedHolderList = index;
        this.setState({selectedHolderList: index})
    }
    render() {
        return (
        <div className="todo-app">
            <div className="item-sort">
                <ItemSortHolderForm onFormSubmit={this.addHolderList}/>
                <ItemSortHolder selectedID={this.state.selectedHolderList} onSelected={this.selectedList} Todos = {this.state.HolderList}/>
            </div>
            <div className="main">
                <Title/>
                <SearchAndFilter onFilter={this.filterItem} onSearch={this.searchItem} filter={this.state.filter}/>
                <AddTaskForm onFormSubmit={this.updateItems} />
                <TaskList items={this.state.HolderList[this.state.selectedHolderList].items} filter={this.state.filter} onDelete={this.deleteItem}/>
            </div>
        </div>
        )
    }
}
ReactDOM.render(<App/>,document.getElementById('root'))
