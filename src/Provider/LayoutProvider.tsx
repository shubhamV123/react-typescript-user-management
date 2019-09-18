import * as React from "react";
import { Layout } from "antd";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import axios from "axios";
import LayoutContainer from "../Containers/LayoutContainer";
// const { Header, Content, Footer, Sider } = Layout;
// const { SubMenu } = Menu;

const LayoutContext = React.createContext(null);

interface LayoutProps extends RouteComponentProps<{ name: string }> {}
interface data {
  id: number;
  label: string;
  key: any;
}

interface stateData extends Array<data> {}
interface LayoutState {
  loading?: boolean;
  data?: stateData[];
  isAuthenticated?: boolean;
}

class LayoutProvider extends React.Component<LayoutProps, LayoutState> {
  state = {
    loading: false,
    data: [],
    isAuthenticated: JSON.parse(localStorage.getItem("isLoggedIn")) || false
  };

  testSignIn = ({ type }) => {
    this.setState({ isAuthenticated: true }, () => {
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      localStorage.setItem("userType", type);
      this.props.history.push("/");
    });
  };
  testSignOut = () => {
    localStorage.clear();
    // localStorage.setItem('isLoggedIn', JSON.stringify(false))
    this.setState({ isAuthenticated: false });
  };
  render() {
    let isHomeActive = this.props.location.pathname === "/";
    let isContactActive = this.props.location.pathname === "/contact";
    let activeKey = isHomeActive ? "1" : isContactActive ? "2" : null;

    return (
      <LayoutContext.Provider
        value={{
          ...this.state,
          testSignIn: this.testSignIn,
          testSignOut: this.testSignOut
        }}
      >
        {Boolean(this.state.isAuthenticated) ? (
          <LayoutContainer signOut={this.testSignOut}>
            {this.props.children}
          </LayoutContainer>
        ) : (
          <Layout className="height-100">{this.props.children}</Layout>
        )}
      </LayoutContext.Provider>
    );
  }
}
const { Consumer: LayoutConsumer, Provider } = LayoutContext;
export { LayoutConsumer, Provider, LayoutContext };
export default withRouter(LayoutProvider);
