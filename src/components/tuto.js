import React, { Component } from "react";
import PropTypes from "prop-types";
import Joyride from "react-joyride";

import "./styles.css";

class Basic extends Component {
  state = {
    run: false
  };

  static propTypes = {
    joyride: PropTypes.shape({
      callback: PropTypes.func
    })
  };

  static defaultProps = {
    joyride: {}
  };

  handleClickStart = e => {
    e.preventDefault();

    this.setState({
      run: true
    });
  };

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

  render() {
    const { run } = this.state;

    return (
      <div className="demo-wrapper">
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
              content: "here the input",
              placement: "bottom",
              styles: {
                options: {
                  width: 900
                }
              },
              target: ".input--how-it-works",
              title: "Our projects"
            }
          ]}
          callback={this.handleJoyrideCallback}
        />

        <div className="demo__section demo__hero">
          <div>
            <h1>Create walkthroughs and guided tours for your ReactJS apps.</h1>
            <button onClick={this.handleClickStart}>Let's Go!</button>
          </div>
        </div>
        <div className="demo__section demo__projects">
          <h1>OUR PROJECTS</h1>
        </div>
        <div className="demo__section demo__how-it-works">
          <h1>HOW DOES IT WORK</h1>
        </div>
        <div className="demo__section demo__about">
          <h1>ALL ABOUT IT</h1>
        </div>
      </div>
    );
  }
}

export default Basic;
