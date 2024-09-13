import React, { useState } from "react";
// import { v4 as uuidv4 } from "uuid";
import { Form, Input, Button, Alert } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "../assets/styles/pages/_registerform.scss";
function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPwd, setIsPwd] = useState(true);
  const [error, setError] = useState(false);

  const authStore = {
    registerUser: (registerData) => {
      console.log("User registered:", registerData);
      // tutaj można dodać logikę do rejestracji użytkownika
    },
  };

  const onSubmit = (values) => {
    // console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", uuidv4());
    const registerData = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    authStore.registerUser(registerData);
    setError(false);
  };

  const onFinishFailed = () => {
    setError(true);
  };

  return (
    <div className="wrapper-auth">
      <h4 className="logo-title">Logo</h4>
      <h2 className="auth-heading">Register</h2>
      <div>
        <Form onFinish={onSubmit} onFinishFailed={onFinishFailed} className="q-gutter-md" layout="vertical">
          <Form.Item label="Name" name="name" rules={[{ required: true, message: "Name is required" }]}>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Please enter a valid email" },
            ]}>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Password is required" },
              { min: 6, message: "Password must be longer than 6 characters" },
            ]}>
            <Input.Password
              type={isPwd ? "password" : "text"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                background: "#ffb74d",
                borderColor: "#ffb74d",
                width: "180px",
              }}>
              Register
            </Button>
          </Form.Item>

          {error && <Alert message="Form submission failed. Please check your input." type="error" showIcon style={{ marginTop: "20px" }} />}
        </Form>
      </div>
    </div>
  );
}

export default RegisterForm;
