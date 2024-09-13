import React, { useState } from "react";
import { observer } from "mobx-react-lite"; // MobX observer to automatyczna reakcja na zmiany w stanie
import authStore from "../stores/AuthStore"; // Import MobX store
// import { useTranslation } from "react-i18next"; // Zakładam, że korzystasz z i18next do tłumaczeń
import { Link } from "react-router-dom";
import { Form, Input, Button, Alert } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const LoginForm = observer(() => {
  // const { t } = useTranslation(); // Hook z i18next do tłumaczeń
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const onSubmit = (values) => {
    const { email, password } = values;
    const loginData = { email, password };

    authStore.loginUser(loginData).then(() => {
      if (!authStore.errorLogin) {
        setError(false);
      } else {
        setError(true);
      }
    });
  };

  const onFinishFailed = () => {
    setError(true);
  };

  return (
    <div className="wrapper-auth">
      <div>
        {/* <h4 className="logo-title">{t("login.logo")}</h4>
        <h2 className="auth-heading">{t("login.title")}</h2> */}
        <Form onFinish={onSubmit} onFinishFailed={onFinishFailed} className="q-gutter-md" layout="vertical">
          <Form.Item
            label="ddd"
            // label={t("login.label.email")}
            name="email"
            rules={[
              {
                required: true,
                // message: t("login.rules.email"),
              },
              {
                type: "email",
                // message: t("login.rules.emailInvalid"),
              },
            ]}>
            <Input
              id="test-login-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              //  placeholder={t("login.label.email")}
            />
          </Form.Item>

          <Form.Item
            label="ss"
            // label={t("login.label.password")}
            name="password"
            rules={[
              {
                required: true,
                // message: t("login.rules.password"),
              },
              {
                min: 6,
                // message: t("login.rules.passwordLength"),
              },
            ]}>
            <Input.Password
              id="test-login-password"
              data-test="nombre_caja"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // placeholder={t("login.label.password")}
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>

          {/* <p className="flex-right">{t("login.rememberPassword")}</p> */}

          <div className="flex-middle">
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ background: "#ffb74d", borderColor: "#ffb74d", width: "180px" }}>
                {/* {t("login.submit")}
                 */}
                ddd
              </Button>
            </Form.Item>
          </div>

          {error && (
            <Alert
              //  message={t("login.errorLogin")}
              type="error"
              showIcon
              style={{ marginTop: "20px" }}
            />
          )}
        </Form>

        {/* <p className="margin"> */}
        {/* {t("login.register.redirect.firstTime")}  */}
        {/* <Link to={`/${t("locale")}/register`}>{t("login.register.redirect.free")}</Link> */}
        {/* </p> */}
      </div>
    </div>
  );
});

export default LoginForm;
