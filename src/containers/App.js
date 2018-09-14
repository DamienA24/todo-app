import React, { Component } from "react";
import api from "./../callApi/api";

import Input from "./../components/inputTodo";
import SelectCategory from "./selectCategory";
import CustomMessage from "./../components/displayMessage";
import "../App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      todoInput: "",
      valueTab: 0,
      valueChecked: [],
      error: null,
      displayMessage: false,
      errorMessage: null
    };

    this.onChangeValueInputTodo = this.onChangeValueInputTodo.bind(this);
    this.changeValueCheck = this.changeValueCheck.bind(this);
    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.updateCheckbox = this.updateCheckbox.bind(this);
    this.callBackendAPI = this.callBackendAPI.bind(this);
    this.keyPressInput = this.keyPressInput.bind(this);
    this.changeArray = this.changeArray.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }

  componentDidMount() {
    this.callBackendAPI();
  }
  callBackendAPI() {
    api()
      .then(results => {
        let newArray = results.data;
        switch (this.state.valueTab) {
          case 1:
            newArray = newArray.filter(todo => todo.completed);
            break;
          case 2:
            newArray = newArray.filter(todo => !todo.completed);
            break;
          default:
            newArray;
        }
        this.setState({ todos: newArray }, () => this.changeValueCheck());
      })
      .catch(error => {
        this.setState({ error }, () => this.setState({displayMessage: true, errorMessage: "oOps something went wrong!!"}));
      });
  }

  onChangeValueInputTodo(event) {
    this.setState({
      todoInput: event.target.value
    });
  }

  keyPressInput(event) {
    if (event.key === "Enter") {
      return this.addTodo();
    }
  }

  addTodo() {
    if (this.state.todoInput.trim() !== "") {
      const todo = {
        text: this.state.todoInput,
        completed: false
      };
      api("post", todo).then(results => {
        this.setState({
          todos: [...this.state.todos, todo],
          todoInput: ""
        });
      });
    }
  }

  deleteTodo(event, index, todo) {
    event.preventDefault();
    const newArr = this.state.todos;
    const url = `todos/${todo.id}`;
    api("delete", todo, url);
    newArr.splice(index, 1);

    this.setState({
      todos: newArr
    });
  }

  handleChangeTab(event, valueTab) {
    this.setState({ valueTab }, () => this.changeArray(valueTab));
  }

  updateCheckbox(index, todo) {
    let newArray = this.state.todos;
    if (newArray[index].completed) {
      newArray[index].completed = false;
    } else {
      newArray[index].completed = true;
    }

    const url = `todos/${todo.id}`;
    api("put", todo, url).then(() => this.callBackendAPI());
  }

  changeArray(valueTab) {
    this.setState({ valueTab: valueTab }, () => this.callBackendAPI());
  }

  changeValueCheck() {
    let todos = this.state.todos;
    let newArrayCheck = [];
    let completed = [];

    switch (this.state.valueTab) {
      case 0:
        todos.forEach(todo => {
          if (todo.completed) {
            newArrayCheck.push(todos.indexOf(todo));
          }
        });
        break;
      case 1:
        completed = todos.filter(todo => todo.completed);
        completed.forEach(todo => {
          newArrayCheck.push(completed.indexOf(todo));
        });
        break;
      case 2:
        newArrayCheck;
        break;
      default:
    }
    this.setState({ valueChecked: newArrayCheck });
  }

  render() {
    return (
      <div className="App">
        <h2>To Do List</h2>
        {this.state.displayMessage ? <CustomMessage errorMessage={this.state.errorMessage} /> : null}

        <Input
          callbackAddTodo={this.addTodo}
          valueTodo={this.state.todoInput}
          callbackValueTodo={this.onChangeValueInputTodo}
          callbackKeyPress={this.keyPressInput}
        />
        <SelectCategory
          todos={this.state.todos}
          callbackDeleteTodo={this.deleteTodo}
          callbackChangeCategory={this.changeArray}
          valueTab={this.state.valueTab}
          callbackChangeTab={this.handleChangeTab}
          valueCheck={this.state.valueChecked}
          callbackUpdateCheckbox={this.updateCheckbox}
        />
      </div>
    );
  }
}

export default App;
