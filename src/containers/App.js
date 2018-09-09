import React, { Component } from 'react';

import Input from './../components/inputTodo';
import SelectCategory from './selectCategory';
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
    this.keyPressInput = this.keyPressInput.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  };

  onChangeValueTodo(event) {
    this.setState(
      {
        todoInput: event.target.value
      })
  }

  keyPressInput(event) {
    if (event.key === 'Enter') {
      return this.addTodo();
    }
  }

  addTodo() {
    if (this.state.todoInput.trim() !== '') {
      const todo = {
        value: this.state.todoInput,
        completed: false,
        id: ++this.state.idTodo
      }

      this.setState({
        todos: [...this.state.todos, todo],
        idTodo: todo.id,
        todoInput: ''
      }, () => console.log("todos: ", this.state.todos))
    };
  }


  deleteTodo(event, index) {
    event.preventDefault();
    const newArr = this.state.todos;
    newArr.splice(index, 1);

    this.setState({
      todos: newArr
    });

  }

  render() {
    return (
      <div className="App">
        <h2>To Do List</h2>
        <Input callbackAddTodo={this.addTodo}
          valueTodo={this.state.todoInput}
          callbackValueTodo={this.onChangeValueTodo}
          callbackKeyPress={this.keyPressInput}
        />
        <SelectCategory todos={this.state.todos}
        callbackDeleteTodo={this.deleteTodo}/>
        
      </div>
    );
  }
}

export default App;
