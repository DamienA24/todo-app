import React from "react";

import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TodoList from "./todo-list";

const SelectCategory = props => {
  return (
    <Paper square>
      <Tabs
        value={props.valueTab}
        indicatorColor="primary"
        textColor="primary"
        onChange={props.callbackChangeTab}
      >
        <Tab label="All" />
        <Tab label="Completed" />
        <Tab label="Active" />
      </Tabs>
      <TodoList
        todos={props.todos}
        callbackDeleteTodo={props.callbackDeleteTodo}
        callbackToggleCheckbox={props.callbackToggleCheckbox}
        value={props.valueTab}
        checkedTodo={props.checkedTodo}
        callbackHandleToggle={props.callbackHandleToggle}
      />
    </Paper>
  );
};

export default SelectCategory;
