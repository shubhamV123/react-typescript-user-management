import * as React from "react";
import Button from "antd/es/button";

interface Props {}

interface State {
  count: number;
}

export default class Counter extends React.Component<Props, State> {
  state: State = {
    count: 0
  };

  increment = () => {
    this.setState({
      count: this.state.count + 1
    });
  };

  decrement = () => {
    this.setState({
      count: this.state.count - 1
    });
  };

  render() {
    return (
      <div className="App">
        {this.state.count}
        <Button onClick={this.increment}>Increment</Button>
        <Button onClick={this.decrement}>Decrement</Button>
      </div>
    );
  }
}
