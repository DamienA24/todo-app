import React, { Component } from 'react';

import Input from './../components/inputTodo';
import TodoList from './todo-list';
import '../App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      idTodo: 0,
      todoInput: '',
      currentTodo: []
    }

    this.addTodo = this.addTodo.bind(this);  
    this.onChangeValueTodo = this.onChangeValueTodo.bind(this);
  };

  onChangeValueTodo(event) {
    this.setState(
      {
        todoInput: event.target.value
      })
  }

  addTodo() {
    const todo = {
      value: this.state.todoInput,
      completed: false,
      id: ++this.state.idTodo    
    }

    this.setState({
      todos: [...this.state.todos, todo],
      idTodo: todo.id,
      todoInput:''
    }, () => console.log("todos: ", this.state.todos))
  };

  render() {
    return (
      <div className="App">
      <h2>To Do List</h2>
        <Input callbackAddTodo={this.addTodo} 
               valueTodo={this.state.todoInput}
               callbackValueTodo={this.onChangeValueTodo}
        />            
        <TodoList todos={this.state.todos}/>
      </div>
    );
  }
}

export default App;
