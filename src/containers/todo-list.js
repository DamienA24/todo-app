import React, { Component } from "react";

import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import SimplePopover from "../components/updateText";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItem from "@material-ui/core/ListItem";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";

class TodoList extends Component {
  constructor() {
    super();
  }

  handleToggle = (value, todo) => () => {
    const { valueCheck } = this.props;
    const currentIndex = valueCheck.indexOf(value);
    const newChecked = [...valueCheck];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    this.props.callbackUpdateCheckbox(value, todo);
  };

  updateText = (todo, text) => {
    this.props.callbackUpdateText(todo, text)
  }

  render() {
    return (
      <div>
        <List>
          {this.props.todos.map((todo, index) => (
            <ListItem key={index} dense button>
              <Checkbox
                checked={this.props.valueCheck.indexOf(index) !== -1}
                tabIndex={-1}
                disableRipple
                color="primary"
                onClick={this.handleToggle(index, todo)}
              />
              <SimplePopover text={todo.text}
              todo={todo}
              callbackUpdateText={this.updateText}/>
{/*               <ListItemText primary={todo.text} />
 */}              <ListItemSecondaryAction
                onClick={e => this.props.callbackDeleteTodo(e, index, todo)}
              >
                <Button color="secondary">
                  <DeleteIcon />
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

export default TodoList;
