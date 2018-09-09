import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TodoList from './todo-list';

class SelectCategory extends Component {
  constructor() {
    super();
    this.state = {
      valueTab: 0,
    };
  }

  render() {
    return (
      <Paper square>
        <Tabs
          value={this.props.valueTab}
          indicatorColor="primary"
          textColor="primary"
          onChange={this.props.callbackChangeTab}
        >
          <Tab label="All" />
          <Tab label="Completed" />
          <Tab label="Active" />
        </Tabs>
        <TodoList todos={this.props.todos}
          callbackDeleteTodo={this.props.callbackDeleteTodo} />
      </Paper>
    );
  }
}

export default SelectCategory;