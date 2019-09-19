import { Layout, Menu } from "antd";
import * as React from "react";
import { Link } from "react-router-dom";
const { Header, Content, Sider } = Layout;

class SiderDemo extends React.Component<any, any> {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    let { active } = this.props;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[active]}
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item key="1">
              <Link to="/user">User</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/top-user">Top User</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: "#fff" }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
            >
              <Menu.Item key="1">
                <span>Home</span>
              </Menu.Item>
              <Menu.Item key="2">
                <span>Sports</span>
              </Menu.Item>
              <Menu.Item key="3">
                <span>News</span>
              </Menu.Item>

              <Menu.Item key="4" onClick={this.props.signOut}>
                <span>Logout</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: "24px" }}>
            <Content
              style={{
                background: "#fff",
                padding: 24,
                margin: 0,
                minHeight: 280
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default SiderDemo;
