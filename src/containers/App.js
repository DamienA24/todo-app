import React, { Component } from "react";
import api from "./../callApi/api";

import Input from "./../components/inputTodo";
import SelectCategory from "./selectCategory";
import "../App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      currentTodo: [],
      idTodo: 0,
      todoInput: "",
      valueTab: 0,
      valueChecked: []
    };

    this.onChangeValueInputTodo = this.onChangeValueInputTodo.bind(this);
    this.handleToggleCheckbox = this.handleToggleCheckbox.bind(this);
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
    api().then(results => this.setState({ todos: results.data.results[0] }));
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
      api("post", todo);
      this.setState(
        {
          todos: [...this.state.todos, todo],
          todoInput: ""
        },
        () => {
          if (this.state.valueTab !== 1) {
            console.log("after post: ", this.state.todos);
            this.setState({ currentTodo: this.state.todos });
          }
        }
      );
    }
  }

  deleteTodo(event, index) {
    event.preventDefault();
    const newArr = this.state.todos;
    newArr.splice(index, 1);

    this.setState({
      todos: newArr
    });
  }

  handleChangeTab(event, valueTab) {
    this.setState({ valueTab }, () => this.changeArray(valueTab));
  }

  handleToggleCheckbox(valueIndexTodo) {
    let newArray = this.state.currentTodo;
    if (newArray[valueIndexTodo].completed) {
      newArray[valueIndexTodo].completed = false;
    } else {
      newArray[valueIndexTodo].completed = true;
    }

    if (this.state.valueTab === 1) {
      newArray = newArray.filter(todo => todo.completed);
    } else if (this.state.valueTab === 2) {
      newArray = newArray.filter(todo => !todo.completed);
    }

    this.setState(
      {
        currentTodo: newArray
      },
      () => this.changeValueCheck()
    );
  }

  updateCheckbox(newChecked, valueTodoIndex) {
    this.setState(
      {
        valueChecked: newChecked
      },
      () => this.handleToggleCheckbox(valueTodoIndex)
    );
  }

  changeArray(valueTab) {
    let newArray = this.state.todos;
    switch (valueTab) {
      case 0:
        newArray = this.state.todos;
        break;
      case 1:
        newArray = newArray.filter(todo => todo.completed);
        break;
      case 2:
        newArray = newArray.filter(todo => !todo.completed);
        break;
      default:
    }
    this.setState({ currentTodo: newArray }, () => this.changeValueCheck());
  }

  changeValueCheck() {
    let todos = this.state.currentTodo;
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
        <Input
          callbackAddTodo={this.addTodo}
          valueTodo={this.state.todoInput}
          callbackValueTodo={this.onChangeValueInputTodo}
          callbackKeyPress={this.keyPressInput}
        />
        <SelectCategory
          todos={this.state.currentTodo}
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
