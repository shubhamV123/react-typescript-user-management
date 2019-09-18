import * as React from "react";
interface Data {
  id: number;
  name: string;
  email: string;
}

interface TableState {
  loading: Boolean;
  data: [];
}

class UserTable extends React.Component<{}, TableState> {
  state: TableState;

  constructor(props) {
    super(props);
    this.state = { loading: true, data: [] };
  }

  render() {
    return <p>The current time is {this.state.loading}</p>;
  }
}

export default UserTable;
