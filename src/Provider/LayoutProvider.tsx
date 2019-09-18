import * as React from "react";
import { Layout } from "antd";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import axios from "axios";
import LayoutContainer from "../Containers/LayoutContainer";

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
  timerID;
  componentDidMount() {
    this.fetchUrl();
    this.setTimeInterval();
  }
  setTimeInterval = () => {
    this.timerID = setInterval(() => this.refreshStats(), 300000);
  };

  refreshStats() {
    let oldBanData = JSON.parse(localStorage.getItem("banData")) || [];
    let filterBanDataBasedOnUser = oldBanData.filter(
      data =>
        data.userType !== "admin" && data && data.expiry <= new Date().getTime()
    );
    if (filterBanDataBasedOnUser.length > 0) {
      this.setState({ loading: true });
      let updateLocalStorage = oldBanData
        .map(data => {
          if (data && data.expiry < new Date().getTime()) {
            return null;
          }
          return data;
        })
        .filter(Boolean);
      console.log(filterBanDataBasedOnUser);

      const modifyData = this.state.data.map(oldData => {
        const findExistingIndex = filterBanDataBasedOnUser.findIndex(
          data => data.id === oldData.id
        );
        if (findExistingIndex !== -1) {
          return {
            ...oldData,
            banUser: false,
            expiry: null
          };
        }
        return {
          ...oldData
        };
      });
      localStorage.setItem("banData", JSON.stringify(updateLocalStorage));
      this.setState({ loading: false, data: modifyData });
    } else {
      clearInterval(this.timerID);
    }
  }

  fetchUrl = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.data;
      let oldBanData = JSON.parse(localStorage.getItem("banData")) || [];

      const modifyData = data.map(oldData => {
        const findExistingIndex = oldBanData.findIndex(
          data => data.id === oldData.id
        );
        if (findExistingIndex !== -1) {
          return {
            ...oldData,
            banUser: oldBanData[findExistingIndex].status,
            userType: oldBanData[findExistingIndex].userType
          };
        }
        return {
          ...oldData,
          banUser: false,
          markTopUser: false,
          userType: null
        };
      });
      this.setState({ loading: false, data: modifyData });
    } catch (e) {
      this.setState({ ...this.state.data, loading: false });
    }
  };

  testSignIn = ({ type }) => {
    this.setState({ isAuthenticated: true }, () => {
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      localStorage.setItem("userType", type);
      this.props.history.push("/");
    });
  };
  testSignOut = () => {
    // localStorage.clear();
    localStorage.removeItem("isLoggedIn");
    this.setState({ isAuthenticated: false });
  };
  modifyData = (id, extraInfo) => {
    let newData = this.state.data.map(data => {
      if (data.id === id) {
        return { ...data, ...extraInfo };
      }
      return data;
    });
    this.setState({ data: newData });
  };
  banUser = (checked, id, type) => {
    if (type === "ban") {
      let oldBanData = JSON.parse(localStorage.getItem("banData")) || [];
      let accountType = localStorage.getItem("userType");
      if (accountType === "user") {
        this.setTimeInterval();
      }
      let objIndex = oldBanData.findIndex(obj => obj.id == id);
      if (objIndex !== -1) {
        oldBanData[objIndex].status = checked;
      } else {
        oldBanData.push({
          id,
          status: checked,
          userType: accountType,
          expiry: accountType === "admin" ? null : new Date().getTime()
        });
      }
      this.modifyData(id, {
        banUser: checked,
        userType: localStorage.getItem("userType")
      });
      localStorage.setItem("banData", JSON.stringify(oldBanData));
    }
    console.log(checked, id, type, localStorage.getItem("userType"));
  };
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    let isHomeActive = this.props.location.pathname === "/";
    let isContactActive = this.props.location.pathname === "/contact";
    let activeKey = isHomeActive ? "1" : isContactActive ? "2" : null;

    return (
      <LayoutContext.Provider
        value={{
          ...this.state,
          testSignIn: this.testSignIn,
          testSignOut: this.testSignOut,
          banUser: this.banUser
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
