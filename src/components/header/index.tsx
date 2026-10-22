import { Dropdown, Space } from "antd";
import React from "react";
import {
  PoweroffOutlined,
  DownOutlined,
  SmileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {clearToken} from "../../store/login/authSlice"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a target="_blank" >
        个人中心
      </a>
    ),
    icon: <UserOutlined />,
  },
  {
    key: "2",
    label: (
      <a target="_blank">
        退出登录
      </a>
    ),
    icon: <PoweroffOutlined />,
  },
];

function MyHeader() {
    const dispatch = useDispatch()
    const navigate=useNavigate()
  const onClick: MenuProps["onClick"] = ({key}) => {
    if(key=="1"){
        console.log("个人中心")
        navigate("/personal")
    }else if(key=="2"){
        dispatch(clearToken())
        sessionStorage.removeItem("userName")
    }
  };
  return (
    <div>
      {/* menu接收一个对象 */}
      <Dropdown menu={{ items, onClick }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            欢迎您 !{sessionStorage.getItem("userName")}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
}

export default MyHeader;
