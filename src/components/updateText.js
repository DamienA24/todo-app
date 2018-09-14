import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import PropTypes from "prop-types";

const styles = theme => ({
  typography: {
    margin: theme.spacing.unit * 2
  },
  input: {
    margin: theme.spacing.unit
  }
});

class SimplePopover extends React.Component {
  state = {
    anchorEl: null,
    inputText:''
  };

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  keyPressInput = event => {
    if (event.key === "Enter") {
        this.props.callbackUpdateText(this.state.inputText, this.props.todo)
      return this.handleClose();
    }
  };

  onChangeInput = event => {
    this.setState({inputText: event.target.value});
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div>
        <Button
          aria-owns={open ? "simple-popper" : null}
          aria-haspopup="true"
          variant="contained"
          onClick={this.handleClick}
        >
          {this.props.text}
        </Button>
        <Popover
          id="simple-popper"
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
        >
          <Input
            placeholder={this.props.text}
            className={classes.input}
            inputProps={{
              "aria-label": "Description"
            }}
            onChange={this.onChangeInput}
            onKeyPress={this.keyPressInput}
          />
        </Popover>
      </div>
    );
  }
}

SimplePopover.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimplePopover);
