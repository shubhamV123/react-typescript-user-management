import * as React from "react";
import { Layout } from "antd";
import { withRouter, RouteComponentProps } from "react-router-dom";
import axios from "axios";
import LayoutContainer from "../Containers/LayoutContainer";

const LayoutContext = React.createContext(null);

interface LayoutProps extends RouteComponentProps<{ name: string }> {}
interface data {
  id: number;
  name: string;
  phone: string;
  email: string;
  website: string;
  address: any;
  company: any;
  username: string;
}

interface stateData extends Array<data> {}
interface LayoutState {
  loading?: boolean;
  data?: stateData[];
  isAuthenticated?: boolean;
  modifiedData?: stateData[];
}

class LayoutProvider extends React.Component<LayoutProps, LayoutState> {
  state = {
    loading: false,
    data: [],
    isAuthenticated: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
    modifiedData: []
  };
  timerID;
  componentDidMount() {
    this.fetchUrl();
    this.setTimeInterval();
  }
  //Check every 5 minut if user need to unblocked
  setTimeInterval = () => {
    this.timerID = setInterval(() => this.refreshStats(), 300000);
  };

  refreshStats() {
    let oldUserData = JSON.parse(localStorage.getItem("userData")) || [];
    //Check if userType is not admin and expiry time is less than current time i.e need to unblock user
    let filterBanDataBasedOnUser = oldUserData.filter(
      data =>
        data.userType !== "admin" &&
        data &&
        data.expiry <= new Date().getTime() &&
        data.banUser
    );
    //If any user exist need to unblock
    if (filterBanDataBasedOnUser.length > 0) {
      this.setState({ loading: true });
      let updateLocalStorage = oldUserData
        .map(data => {
          if (data && data.expiry < new Date().getTime()) {
            return { ...data, banUser: false, expiry: null };
          }
          return data;
        })
        .filter(Boolean);
      //update the state by setting expiry null and banuser false to unblock
      const modifiedData = this.state.modifiedData.map(oldData => {
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
      //update new data in localStorage
      localStorage.setItem("userData", JSON.stringify(updateLocalStorage));
      //Update State
      this.setState({ loading: false, data: modifiedData, modifiedData });
    } else {
      //nothing to check so unset the interval
      clearInterval(this.timerID);
    }
  }
  //Fetch Data when component Did Mount
  fetchUrl = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.data;
      let oldUserData = JSON.parse(localStorage.getItem("userData")) || [];
      //Check if already data is stored in localstorage if exist then update state according to it
      const modifiedData = data.map(oldData => {
        const findExistingIndex = oldUserData.findIndex(
          data => data.id === oldData.id
        );
        if (findExistingIndex !== -1) {
          return {
            ...oldData,
            banUser: oldUserData[findExistingIndex].banUser,
            userType: oldUserData[findExistingIndex].userType,
            markTopUser: oldUserData[findExistingIndex].markTopUser
          };
        }
        return {
          ...oldData,
          banUser: false,
          markTopUser: false,
          userType: null
        };
      });
      this.setState({ loading: false, data: modifiedData, modifiedData });
    } catch (e) {
      this.setState({ ...this.state, loading: false });
    }
  };
  //Mock Sign In Function
  testSignIn = ({ type }) => {
    this.setState({ isAuthenticated: true }, () => {
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      localStorage.setItem("userType", type);
      this.props.history.push("/user");
    });
  };
  //Mock Signout Function
  testSignOut = () => {
    localStorage.removeItem("isLoggedIn");
    this.setState({ isAuthenticated: false });
  };
  //Comman function to mark user top or ban user
  modifyData = (id, extraInfo) => {
    let newData = this.state.modifiedData.map(data => {
      let { type, checked, userType } = extraInfo;
      if (data.id === id) {
        return {
          ...data,
          [type]: checked,
          userType:
            data.userType === "admin" && data.banUser === true
              ? "admin"
              : userType //if admin has blocked to not update usertype
        };
      }
      return data;
    });
    this.setState({ modifiedData: newData });
  };
  //A function to store and update state and localstorage
  toggleSwitch = (checked, id, type) => {
    let oldUserData = JSON.parse(localStorage.getItem("userData")) || [];
    let accountType = localStorage.getItem("userType");
    //Restart timer if the toggle switch is on by user
    if (accountType === "user" && type === "banUser") {
      this.setTimeInterval();
    }
    let objIndex = oldUserData.findIndex(obj => obj.id == id);
    if (objIndex !== -1 && type === "banUser") {
      oldUserData[objIndex].banUser = checked;
      oldUserData[objIndex].expiry = checked ? new Date().getTime() : null;
    } else if (objIndex !== -1 && type === "markTopUser") {
      oldUserData[objIndex].markTopUser = checked;
    } else {
      oldUserData.push({
        id,
        [type]: checked,
        userType: accountType,
        expiry: accountType === "admin" ? null : new Date().getTime()
      });
    }
    this.modifyData(id, {
      checked,
      type,
      userType: localStorage.getItem("userType")
    });
    localStorage.setItem("userData", JSON.stringify(oldUserData));
  };
  //remove subscription if component is unmounted
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  //Function to fiter  top user
  filterTopUserData = () => {
    let oldUserData = JSON.parse(localStorage.getItem("userData")) || [];

    let topUsersAre = oldUserData.filter(data => data.markTopUser);
    return this.state.modifiedData.filter(data => {
      let findTopUserIndex = topUsersAre.findIndex(
        topUser => topUser.id === data.id
      );
      if (findTopUserIndex !== -1) {
        return true;
      }
      return false;
    });
  };
  //Function to search user by email or name
  searchUser = e => {
    let userData = this.state.data.filter(
      data =>
        data.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        data.email.toLowerCase().includes(e.target.value.toLowerCase())
    );
    this.setState({
      modifiedData: userData
    });
  };

  render() {
    let isUserActive = this.props.location.pathname === "/user";
    let isTopUserActive = this.props.location.pathname === "/top-user";
    let activeKey = isUserActive ? "1" : isTopUserActive ? "2" : "1";

    return (
      <LayoutContext.Provider
        value={{
          ...this.state,
          topUsersAre: isTopUserActive ? this.filterTopUserData() : null,
          testSignIn: this.testSignIn,
          testSignOut: this.testSignOut,
          toggleSwitch: this.toggleSwitch,
          searchUser: this.searchUser
        }}
      >
        {Boolean(this.state.isAuthenticated) ? (
          <LayoutContainer signOut={this.testSignOut} active={activeKey}>
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
