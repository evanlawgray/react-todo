import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

const ToDoItem = ({ item, toggleComplete, removeToDo }) => (
  <li>{item.title}
      <input
        type="checkbox"
        id={item.id}
        checked={item.complete}
        onChange={toggleComplete} 
      />
      <label htmlFor={item.id}></label>
      <button onClick={removeToDo}>
         <i className="fa fa-trash"></i>
      </button>
   </li>
)

const ClearButton = ( { removeCompleted } ) => (
  <button onClick={removeCompleted}>Clear Completed</button>
)

const ToDoCount = ( { number } ) => (
  <div>{number} {number === 1 ? 'todo' : 'todos'}</div>
)

class App extends Component {
  constructor() {
    super();

    this.state = {
      toDos: [
        {id: 0, title: 'learn React', complete: false},
        {id: 1, title: 'play video games', complete: false}
      ],
      lastId: 0
    }

    this.removeCompleted = this.removeCompleted.bind(this);
    this.addToDo = this.addToDo.bind(this);
  }

  toggleComplete(item) {
    let newTodos = this.state.toDos.map( (todo) =>  {
      return item.id === todo.id ? todo.complete = !todo.complete : todo.complete
    })

    this.setState({
      todos: newTodos
    })
  }

  removeToDo(item) {
    let newTodos = this.state.toDos.filter( (todo) => {
      return todo.id !== item.id;
    })

    this.setState({
      toDos: newTodos
    })
  }

  removeCompleted() {
    let newTodos = this.state.toDos.filter((todo) => !todo.complete);
    this.setState({ 
      toDos: newTodos
    });
  }

  hasCompleted() {
    let completedTodos = this.state.toDos.filter((todo) => todo.complete);

    if (completedTodos.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  addToDo(event) {
    event.preventDefault();

    if (this.toDoInput.value) {
      const id = this.state.lastId++;

      const newTodos = this.state.toDos.concat({
        id,
        title: this.toDoInput.value,
        complete: false
      })

      this.setState({
        toDos: newTodos,
        lastId: id
      })

      this.toDoInput.value = '';
    }
  }

  componentDidMount() {
    this.toDoInput.focus();
  }

  render() {
    return (
      <div className="todo-list">
        <h1>To-Do List</h1>
        <div className="add-todo">
          <form name="addTodo" onSubmit={this.addToDo}>
              <input type="text" ref={(input) => (this.toDoInput = input)} />
              <span>(press enter to add)</span>
          </form>
        </div>
        <ul>
          {this.state.toDos.map( ( item, i ) => ( 
            <ToDoItem
              key={i}
              item={item}
              toggleComplete={() => this.toggleComplete( item )}
              removeToDo={() => this.removeToDo( item )}
            />
          ))}
        </ul>
        <div className="todo-admin">
          <ToDoCount number={ this.state.toDos.length } />
          {this.hasCompleted() && 
            <ClearButton removeCompleted={this.removeCompleted} /> 
          }
        </div>
      </div>
    );
  }
}

ToDoItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    complete: PropTypes.bool
  }).isRequired,
  toggleComplete: PropTypes.func.isRequired,
  removeToDo: PropTypes.func.isRequired
};

ClearButton.propTypes = {
  removeCompleted: PropTypes.func.isRequired 
};

ToDoCount.propTypes = {
  number: PropTypes.number.isRequired
};

export default App;
