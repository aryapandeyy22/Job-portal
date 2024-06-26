import { Button, Dropdown, Menu } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
//import "./../Resources/Stylesheets/defaultlayout.css";
import { UserOutlined } from "@ant-design/icons";

function DefaultLayout(props) {
 
  const navigate = useNavigate();
  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/home">Home</Link>
      </Menu.Item>
      
      <Menu.Item
        // To logout
        onClick={() => {
         navigate("/login");
        }}
      >
        <span>Logout</span>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="layout">
      <div className="header">
        <h1 onClick={() => navigate("/home")} style={{ cursor: "pointer" }}>
          Resume Builder
        </h1>
        <Dropdown overlay={menu} placement="bottomLeft">
          <Button className="iconButton" icon={<UserOutlined />}>
            {user.username}
          </Button>
        </Dropdown>
      </div>
      <div className="content" style={{ overflow: "scroll" }}>
        {props.children}
      </div>
    </div>
  );
}

export default DefaultLayout;
