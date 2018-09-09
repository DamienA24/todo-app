import React, { Component }  from 'react';

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';

class TodoList extends Component {
  constructor() {
    super();
    this.state = {
      checked: [],
    }
  }
  
  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    console.log(this.props.todos[value]);

    if (currentIndex === -1) {
      newChecked.push(value);
      this.props.todos[value].completed = true;  
    } else {
      newChecked.splice(currentIndex, 1);
      this.props.todos[value].completed = false;  
    }

    this.setState({
      checked: newChecked,
    });
  };

  render() {
    return (
      <div>
        <List>
        {this.props.todos.map((todo, index) => (
            <ListItem
              key={index}
              dense
              button
              onClick={this.handleToggle(index)}
            >
              <Checkbox
                checked={this.state.checked.indexOf(index) !== -1}
                tabIndex={-1}
                disableRipple
                color="primary"
              />
              <ListItemText primary={todo.value} />
              <ListItemSecondaryAction onClick={e => this.props.callbackDeleteTodo(e, index)}>
              <Button color="secondary">
                <DeleteIcon />
              </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    )
  }
};

export default TodoList;