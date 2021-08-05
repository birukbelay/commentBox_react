import { Form, Input, Button, Typography, Card, Checkbox } from "antd";
import { useHistory, Link } from "react-router-dom";
import validator from "validator";
import React, { useState, useEffect } from "react";
// import "./style.css";
import {loginUser} from "../../../store/Auth";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../../../store/Auth/auth.selectors";

import {Status} from "../../../store/store.types";

const { Title, Text } = Typography;


const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const state = useSelector(state => state)
  //destructuring  the auth
  const {status, signError } =selectAuth(state);
  const [button, setButton]= useState({color:'primary', text:"Login"})

  useEffect(() => {
    switch (status) {
      case Status.NORMAL:
        setButton({color:"primary", text: "Login"});
        return
      case Status.ERROR:
        setButton({color:"danger", text: "error"});
        setTimeout(() => {
          setButton({color:"primary", text: "Login"});
        }, 1000);
        return
      case Status.LOADING:

        setButton({color:"primary", text: "Loading..."});
        return
      case Status.SUCCESS:
        setButton({color:"success", text: "Login"});
        return
      default:
        setButton({color:"primary", text: "Login"});
    }
  }, [status]);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    rememberMe: false,
    error: "",
  });
  const {  rememberMe, error } = credentials;

  useEffect(() => {
    setCredentials({ email: "", password: "", rememberMe: false, error: "" });
  }, []);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setCredentials({ ...credentials, [name]: value });
  // };
  const handleErrors = (msg) => {
    setCredentials({ ...credentials, error: msg });
  };
  const handleChecked = (e) => {
    setCredentials({ ...credentials, rememberMe: e.target.checked });
  };



  const handleSubmit = (values) => {
    const data={
      email: values.email,
      password: values.password,
    }
    if (validator.isEmpty(values.email) || validator.isEmpty(values.password)) {
      handleErrors("All fields are required!");
      return;
    }
    if (!validator.isEmail(values.email)) {
      handleErrors("Invalid email format!");
      return;
    }

    dispatch(loginUser(data, history, rememberMe))
  };
  return (
    <>

        <div   style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}>
          <noform className="box-shadow" style={{ width: 400, padding: 20 }}>
            <Card hoverable style={{ width: "500px" }}>
            <Title level={3}> Login</Title>
            <Form initialValues={{}} onFinish={handleSubmit}>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input size="large" placeholder="Email Address" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password size="large" placeholder="Password" />
              </Form.Item>

              {error?<Text type="danger">{error}</Text>:""}
              {signError?<Text type="danger">{signError}</Text>:""}
              {/*{status}*/}


              <Form.Item>
                <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems:'baseline'

                    }}
                >
                  <Form.Item>
                  <Checkbox onChange={handleChecked}>Remember me</Checkbox>
                    </Form.Item>

                  <Button
                      type={button.color}
                      disabled={status===Status.LOADING}
                      htmlType="submit"
                      style={{ width: "200px" }}
                  >
                    {button.text}
                  </Button>
                </div>
              </Form.Item>

              <Form.Item>

                <Typography.Text>
                  Dont have account? <Link to="/signup">sign up</Link>
                </Typography.Text>
              </Form.Item>
            </Form>
            </Card>
            {/*<Link to="/signup">Register here</Link>*/}
          </noform>
        </div>
      {/*</div>*/}
    </>
  );
};

export default Login;
