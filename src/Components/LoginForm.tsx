import * as React from "react";
import { Form, Icon, Input, Button, message, Row, Col } from "antd";
import { LayoutContext } from "../Provider/LayoutProvider";
const { useContext } = React;
const LoginForm: React.FC<{}> = (props: any) => {
  const layoutContext = useContext(LayoutContext);
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        let { username, password } = values;
        if (username === "test" && password === "test") {
          layoutContext.testSignIn({ type: "user" });
        } else if (username === "admin" && password === "admin") {
          layoutContext.testSignIn({ type: "admin" });
        } else {
          message.error("Please enter valid username or password.");
        }
      }
    });
  };

  const { getFieldDecorator } = props.form;
  return (
    <Row className="background-white">
      <Col
        xs={24}
        sm={24}
        md={{ span: 12, offset: 7 }}
        lg={{ span: 8, offset: 8 }}
        className="pt-1 "
      >
        <div className="m-1">
          <Form onSubmit={handleSubmit} className="login-form m-1">
            <h1>Login</h1>
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [
                  { required: true, message: "Please input your username!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="type username : test"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please input your Password!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="type password : test"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </Form.Item>
            <div>
              <h3>Credentials for Admin login</h3>
              <div>
                Username: <strong>admin</strong>
                <br />
                Password : <strong>admin</strong>
              </div>
            </div>

            <div>
              <h3>Credentials for user login</h3>
              <div>
                Username: <strong>test</strong>
                <br />
                Password : <strong>test</strong>
              </div>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

const WrappedLoginForm = Form.create({ name: "normal_login" })(LoginForm);
export default WrappedLoginForm;
