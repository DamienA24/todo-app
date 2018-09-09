import React from 'react';
import Input from '@material-ui/core/Input';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  input: {
    margin: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

const Inputs = (props) => {
  const { classes } = props;
  return (
    <div className={classes.container}>
      <Input
        className={classes.input}
        placeholder="Add your ToDo"
        value={props.valueTodo}
        onChange={props.callbackValueTodo}
        onKeyPress={props.callbackKeyPress}
      />
       <Button variant="fab" size="small" color="primary" aria-label="Add" className={classes.button}
       onClick={props.callbackAddTodo}>
        <AddIcon />
      </Button>
    </div>
  )
};

export default withStyles(styles)(Inputs);