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
        value={props.valueTab}
        valueCheck={props.valueCheck}
        callbackUpdateCheckbox={props.callbackUpdateCheckbox}
      />
    </Paper>
  );
};

export default SelectCategory;
