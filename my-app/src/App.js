import React from "react"
import Header from './Header'
import MainContent from './MainContent'
import TodoItem from './TodoItem'
import todosData from './todosData'

class App extends React.Component {
  constructor() {
    super();
    this.state = {todos:todosData};
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(id) {
    this.setState(prevState => {
      const updateTodos = prevState.todos.map(todo => {
        if(todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
      return {
        todos: updateTodos
      }
    })
  }
  render() {
    const data = this.state.todos.map(item =><TodoItem key={item.id} item={item} handleClick={this.handleClick}/>);
    return(
      <div className="todo-list">
        {data}
      </div>
    )
  }

}

export default App
