import "./index.scss";
// 图片资源不会被webpack处理,只能导入当作变量使用或者图片地址是一个在线地址
import bg from "../../assets/bg.jpg";
import lgbg from "../../assets/lgbg.jpg";
import logo from "../../assets/logo.png";

import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { login } from "../../api/users";
import { setToken } from "../../store/login/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);  // 登录按钮的loading状态

  const handleLogin = () => {
    form
      .validateFields()
      .then(async (res) => {
        setLoading(true);   // 显示登录按钮的登录的时候的加载状态
        console.log(res);
        const {
          data: { token,username },
        } = await login(res);
        setLoading(false);
        // 登录成功后，将token保存到redux中保存
        dispatch(setToken(token));
        sessionStorage.setItem("userName", username);
        // 登录成功后，跳转到首页
        navigate("/",{replace:true});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login" style={{ backgroundImage: `url(${bg})` }}>
      <div className="lgbg" style={{ backgroundImage: `url(${lgbg})` }}>
        <div className="part">
          {/* 头部标题 */}
          <div className="title">
            <div className="logo">
              <img src={logo} alt="" width={80} />
            </div>
            <h1>朋远智慧园区管理平台</h1>
          </div>

          {/* 登录表单 */}
          <Form form={form}>
            {/* form.item表单的每一项 */}
            <Form.Item
              //label="用户名"        // label属性是表单的标题
              name="username" // name属性是表单的标识，用于表单验证
              rules={[
                // rules属性是表单的验证规则(required:true必填)
                { required: true, message: "用户名不能为空!" },
                // { min: 3, message: "用户名不能小于3位!" },
                // { max: 10, message: "用户名不能大于10位!" },
                {
                  pattern: /^[a-zA-Z0-9]{4,8}$/,
                  message: "用户名必须是4-8位字母或数字!",
                }, //自定义正则规则
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
            </Form.Item>

            <Form.Item
              //label="密码"
              name="password"
              rules={[{ required: true, message: "密码不能为空!" }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="请输入密码"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                style={{ width: "100%" }}
                onClick={handleLogin}
                loading={loading}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
