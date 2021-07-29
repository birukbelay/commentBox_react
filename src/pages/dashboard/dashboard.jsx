import React, { Component } from 'react';

import { Layout, Breadcrumb, Menu, Anchor, Table, Tag, Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import accounts from "./accounts";
const { Content, Header, Sider } = Layout;
const { SubMenu } = Menu;
// const { Link } = Anchor

class Dashboard extends Component {

  constructor(props, context) {
    super(props, context);



    var selectedAccount = {};
    if (this.props.account) {
      selectedAccount = this.state.accounts.filter(account => account.id == this.props.account)[0];
    }
    else {
      selectedAccount = accounts[0]
    }

    this.state = {
      selectedAccount: selectedAccount,
      accounts: accounts,
      viewingTransactions: false
    }
  }

  changeDashboard = (e) => {
    var key = e.key;
    this.setState({ selectedAccount: this.state.accounts.filter(account => account.id == key)[0] });
  }

  render() {
    const columns = [
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        sorter: {
          compare: (a, b) => a.amount - b.amount
        },
      },
      {
        title: 'Tags',
        dataIndex: 'tags',
        key: 'tags',
        render: tags => {
          return tags.map(tag => {
            return (<Tag color="blue" key={tag}>
              {tag}
            </Tag>);
          })
        }
      },
    ];

    var table = this.state.selectedAccount.transactions ? <Table dataSource={this.state.selectedAccount.transactions} columns={columns}></Table> : ''

    return (
      <Layout style={{ minHeight: "100vh" }}>

          {/* SIde bar */}
        <Sider collapsible>

          <div style={{ height: "32px", margin: "16px" }}></div>
          <Menu defaultOpenKeys={['accounts']} defaultSelectedKeys={[this.state.selectedAccount.id ? this.state.selectedAccount.id.toString() : '']} theme="dark" mode="inline">
            <SubMenu key="accounts" icon={<UserOutlined />} title="Accounts">
              {
                this.state.accounts.map((account, i) => {
                  return <Menu.Item onClick={(e) => this.changeDashboard(e)} key={account.id}>{account.name}</Menu.Item>
                })
              }
            </SubMenu>
          </Menu>
        </Sider>

        {/*  */}
        <Layout className="site-layout">
          {/* <SiteHeader /> */}
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>
                <a href="/">Dashboard</a>

              </Breadcrumb.Item>
            </Breadcrumb>

            <Row>
              <Col>
                <h2>{this.state.selectedAccount.name}</h2>
              </Col>
            </Row>

            <Row>
              <Col span="4"/>
              <Col span="16">{table}</Col>
              <Col span="4"/>
            </Row>
          </Content>

          
        </Layout>
      </Layout >
    );
  }
};
export default Dashboard;