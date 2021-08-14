import {Link, Route, Switch, useRouteMatch} from 'react-router-dom'

import * as PropTypes from "prop-types";
import Routes from "../../../Constants/routes";
import Profile from "../profile/Profile";
import {QuestionsPage} from "../../../features/questions/questions.tsx";
import {CommentsPage} from "../../../features/comments/comment";
import "./dash.css"
import {Layout, Menu} from 'antd';
import {UserOutlined, CommentOutlined, QuestionOutlined} from '@ant-design/icons';
import TopBar from "../../../components/tob-bar";
import {logoutUser} from '../../../features/users/users.reducer'
import {useDispatch} from "react-redux";
const { Content, Sider } = Layout;


// const { Link } = Anchor


const Dashboard=()=> {
    let match = useRouteMatch();
    const dispatch= useDispatch();

    return (
        <Layout>
            {/* SIde bar */}
            <SideBar match={match}/>


            {/*  */}
            <Layout className="site-layout" style={{marginLeft: 200}}>
                {/* <SiteHeader /> */}
                <TopBar logout={()=>dispatch(logoutUser())}/>
                <Layout style={{padding: '0 24px 24px'}}>
                    <Content className="site-layout-background"
                             style={{
                                 padding: 24,
                                 margin: 0,
                                 minHeight: 280,
                                 width:'100%'
                             }}>
                        <Switch>
                            <Route exact path={`${match.path}/`} component={QuestionsPage}/>
                            <Route path={`${match.path}${Routes.PROFILE}`} component={Profile}/>
                            <Route path={`${match.path}${Routes.COMMENTS}`} component={CommentsPage}/>

                        </Switch>
                    </Content>


                </Layout>
            </Layout>

        </Layout>
    );
};
export default Dashboard;



function SideBar(props) {
    return <Sider style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
    }} collapsible>
        <div className="logo">
            .
        </div>

        <Menu defaultOpenKeys={["sub1"]} defaultSelectedKeys={["1"]}
              theme="dark" mode="inline">
            {/*<SubMenu key="sub1" icon={<UserOutlined/>} title="Accounts">*/}

            <Menu.Item icon={<CommentOutlined/>}>
                <Link to={`${props.match.path}${Routes.COMMENTS}`}>
                    comments
                </Link>
            </Menu.Item>
            <Menu.Item key="1" icon={<QuestionOutlined/>} >
                    <Link to={`${props.match.path}/`}>
                        questions
                    </Link>
                </Menu.Item>
                <Menu.Item icon={<UserOutlined/>}>
                    <Link to={`${props.match.path}/profile/9`}>
                        profile
                    </Link>
                </Menu.Item>

            {/*</SubMenu>*/}
        </Menu>
    </Sider>;
}

SideBar.propTypes = {match: PropTypes.any};






