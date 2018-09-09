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
      currentTodo: [],
      valueTab: 0
    }

    this.addTodo = this.addTodo.bind(this);
    this.onChangeValueTodo = this.onChangeValueTodo.bind(this);
    this.keyPressInput = this.keyPressInput.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.changeArray = this.changeArray.bind(this);
    this.HandleChangeTab = this.HandleChangeTab.bind(this);
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
    let newId = this.state.idTodo;

    if (this.state.todoInput.trim() !== '') {
      const todo = {
        value: this.state.todoInput,
        completed: false,
        id: ++newId
      }
      this.setState({
        todos: [...this.state.todos, todo],
        idTodo: todo.id,
        todoInput: ''
      })
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

  HandleChangeTab = (event, valueTab) => {
    this.setState({ valueTab });
    return this.changeArray(valueTab);
  };

  changeArray(valueArray) {
    let newArray = this.state.todos;

    switch (valueArray) {
      case 0:
        newArray = this.state.todos
        break
      case 1:
        newArray = newArray.filter((todo) => todo.completed)
        break
      case 2:
        newArray = newArray.filter((todo) => !todo.completed)
        break
      default:
    }
    return newArray;
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
        <SelectCategory todos={this.changeArray(this.state.valueTab)
        }
          callbackDeleteTodo={this.deleteTodo}
          callbackChangeCategory={this.changeArray}
          valueTab={this.state.valueTab}
          callbackChangeTab={this.HandleChangeTab} />
      </div>
    );
  }
}

export default App;
