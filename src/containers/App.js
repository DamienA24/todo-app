import React, { Component } from "react";
import api from "./../callApi/api";

import PropTypes from "prop-types";
import Joyride from "react-joyride";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
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
      errorMessage: null,
      run: false
    };

    this.onChangeValueInputTodo = this.onChangeValueInputTodo.bind(this);
    this.changeValueCheck = this.changeValueCheck.bind(this);
    this.handleClickStart = this.handleClickStart.bind(this);
    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.updateCheckbox = this.updateCheckbox.bind(this);
    this.callBackendAPI = this.callBackendAPI.bind(this);
    this.keyPressInput = this.keyPressInput.bind(this);
    this.changeArray = this.changeArray.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.updateText = this.updateText.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }

  static propTypes = {
    joyride: PropTypes.shape({
      callback: PropTypes.func
    })
  };

  static defaultProps = {
    joyride: {}
  };

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
        this.setState({ error }, () =>
          this.setState({
            displayMessage: true,
            errorMessage: "oOps something went wrong!!"
          })
        );
      });
  }

  handleClickStart(event) {
    event.preventDefault();
    this.setState({ run: true });
  }

  handleJoyrideCallback = data => {
    const { joyride } = this.props;
    const { type } = data;

    if (typeof joyride.callback === "function") {
      joyride.callback(data);
    } else {
      console.group(type);
      console.log(data); //eslint-disable-line no-console
      console.groupEnd();
    }
  };

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
    return this.updateTodo(todo);
  }

  updateText(newText, todo) {
    const newTodo = {
      completed: todo.completed === 0 ? false : true,
      id: todo.id,
      text: newText
    };
    return this.updateTodo(newTodo);
  }

  updateTodo(todo) {
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
        <Joyride
          continuous
          scrollToFirstStep
          showProgress
          showSkipButton
          run={this.state.run}
          steps={[
            {
              content: <h2>Let's start the tour!</h2>,
              placement: "center",
              disableBeacon: true,
              styles: {
                options: {
                  zIndex: 10000
                }
              },
              target: "body"
            },
            {
              content: "here writing your text",
              placement: "left",
              styles: {
                options: {
                  width: 500
                }
              },
              target: ".input--how-it-works",
              title: "Add your ToDo"
            },
            {
              content: "Click for send",
              placement: "right",
              styles: {
                options: {
                  width: 300
                }
              },
              target: ".click__button--input",
              title: "Send your ToDo"
            }
          ]}
          callback={this.handleJoyrideCallback}
        />
        <Grid container justify="center" spacing={16} x={10}>
          <Grid item xs={12}>
            <h2>To Do List</h2>
          </Grid>
          {this.state.displayMessage ? (
            <CustomMessage errorMessage={this.state.errorMessage} />
          ) : null}
          <Grid item xs={12}>
            <Input
              callbackAddTodo={this.addTodo}
              valueTodo={this.state.todoInput}
              callbackValueTodo={this.onChangeValueInputTodo}
              callbackKeyPress={this.keyPressInput}
              className={"input--how-it-works"}
            />
          </Grid>
          <Grid item xs={5}>
            <SelectCategory
              todos={this.state.todos}
              callbackDeleteTodo={this.deleteTodo}
              callbackChangeCategory={this.changeArray}
              valueTab={this.state.valueTab}
              callbackChangeTab={this.handleChangeTab}
              valueCheck={this.state.valueChecked}
              callbackUpdateCheckbox={this.updateCheckbox}
              callbackUpdateText={this.updateText}
            />
          </Grid>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-end"
            xs={2}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleClickStart}
              fullWidth={"true"}
            >
              add todo ?
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleClickStart}
              fullWidth={"true"}
            >
              update Todo ?
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
