import React, { useState } from "react";
import { Layout, theme} from "antd";

import MyBreadCrumb from "../../components/breadCrumb";
import NavLeft from "../../components/navLeft";
import MyHeader from "../../components/header";
import { Outlet } from "react-router-dom";


const { Header, Content, Footer, Sider } = Layout;



function Home() {
  const [collapsed, setCollapsed] = useState<boolean>(false);
    const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>

        {/* 侧边导航 */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
       <NavLeft />
      </Sider>
      <Layout >
        {/* 头部 */}
        <Header style={{ paddingRight: "20px", background: colorBgContainer,textAlign: "right",}} >
            <MyHeader />
        </Header>

        {/* 内容 */}
        <Content style={{ margin: "0 16px" ,height:"80vh" ,overflowY:"auto",scrollbarWidth:"none",overflowX:"hidden"}} >
            {/* 面包屑导航 */}
          <MyBreadCrumb />
          <Outlet />
        </Content>

        {/* 页脚 */}
        <Footer style={{ textAlign: "center" }}>
          wisdom ©{new Date().getFullYear()} Created by huyuqian
        </Footer>
      </Layout>
    </Layout>
  );
}

export default Home;
