import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class SelectCategory extends Component {
  state = {
    valueTab: 0,
  };

  handleChange = (event, valueTab) => {
    this.setState({ valueTab });
  };

  render() {
    return (
      <Paper square>
        <Tabs
          value={this.state.valueTab}
          indicatorColor="primary"
          textColor="primary"
          onChange={this.handleChange}
        >
          <Tab label="All" />
          <Tab label="Completed" />
          <Tab label="Active" />
        </Tabs>
      </Paper>
    );
  }
}

export default SelectCategory;