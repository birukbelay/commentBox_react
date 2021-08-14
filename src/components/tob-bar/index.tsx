import { Typography, Avatar, Space, Menu, Dropdown, Button } from "antd";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../app/rootReducer";

const TopBar = ({logout}) => {
    const {  currentUser } = useSelector((state:RootState) => state.auth);
  const onLogOut = () => {
    logout()
  };
  return (
    // full Div
    <div
      style={{
        background: "#fff",
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* home */}

      <Link to="/" style={{ fontWeight: "bold", fontSize: "23px" }}>
        Home
      </Link>

      {/* <Link to="/comments" style={{ fontWeight: "bold", fontSize: "23px" }}>       
      <Button>Comments</Button>
      </Link> 
      <Link to="/dash" style={{ fontWeight: "bold", fontSize: "23px" }}>       
      <Button>dash</Button>
      </Link> */}
      {/* userProfile */}
     <Dropdown
        overlay={
          <Menu>
            <Menu.Item onClick={onLogOut}>Logout</Menu.Item>
          </Menu>
        }
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Space direction="horizontal" size="middle">
            <Typography.Text>{currentUser?.firstname}</Typography.Text>

            <Avatar size="default">{currentUser?.firstname[0]}</Avatar>

          </Space>
        </div>
       </Dropdown>

    </div>
  );
};
export default TopBar;
