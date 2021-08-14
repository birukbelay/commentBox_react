import "./topbar.css";

import { Link } from "react-router-dom";
import { Typography, Avatar, Space, Menu, Dropdown, Button } from "antd";
// import { useContext } from "react";
import {useDispatch, useSelector} from "react-redux";


export default function Topbar() {
  const onLogOut = () => {
    /**
     * TODO: Handle Logout
     */
  };
  const user = useSelector(state => state.auth)
  console.log("---===>",user)
  
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Home</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar" style={{textAlign:"center"}}>
           <span>            View The Best Houses In Town</span>
          {/*<Search className="searchIcon" />*/}
          {/*<input*/}
          {/*  placeholder="Search for houses to find"*/}
          {/*  className="searchInput"*/}
          {/*/>*/}
        </div>
      </div>
      <div className="topbarRight">

      {/* <Dropdown
        overlay={
          <Menu>
            <Menu.Item onClick={onLogOut}>Logout</Menu.Item>
          </Menu>
        }
      > */}
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Space direction="horizontal" size="middle">
            <Typography.Text>John</Typography.Text>
            <Link to={'/dash'}>
            <Avatar size="default">J</Avatar>
            </Link>
          </Space>
        </div>
      {/* </Dropdown> */}

        {/* <Link to={'/admin'}>
          <img
            src={
               PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link> */}
      </div>
    </div>
  );
}
