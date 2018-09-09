import React, { Component }  from 'react';

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import SelectCategory from '../components/selectCategory';
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

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  render() {
    return (
      <div>
        <SelectCategory />
        <List>
        {[0, 1, 2, 3].map(value => (
            <ListItem
              key={value}
              role={undefined}
              dense
              button
              onClick={this.handleToggle(value)}
            >
              <Checkbox
                checked={this.state.checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                color="primary"
              />
              <ListItemText primary={`Line item ${value + 1}`} />
              <ListItemSecondaryAction onClick={() => alert("test")}>
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