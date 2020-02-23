import React from 'react';
import { Link } from "react-router-dom";
import { Menu, Icon } from 'antd';
import styles from 'pages/common/menu/menu.module.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
const { SubMenu } = Menu;

class SideMenuUI extends React.Component {

  rootSubmenuKeys = this.props.menus.map(item => (
    item.id
  ))
  state = {
    openKeys: [],
    current: "0"
  };

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  handleClick = e => {
    this.setState({
      current: e.key,
    });
  };

  //递归菜单
  mapMenuList(menus) {
    return (
      menus.map(i => {
        if (i.children && i.children.length > 0) {
          return (
            <SubMenu
              key={i.key}
              title={<span>
                <Icon type={i.menuLogo} />
                <span>{i.menuName}</span>
              </span>
              }
            >
              {this.mapMenuList(i.children)}
            </SubMenu>
          )
        } else {
          return <Menu.Item key={i.key}><Link to="/app/list">{i.menuName}</Link></Menu.Item>
        }
      })
    )
  }

  render() {
    return (
      <div className={this.props.collapsed ? styles.menuMin : styles.menuMax}>
        <Menu
          selectedKeys={[this.state.current]}
          mode="inline"
          theme="dark"
          openKeys={this.state.openKeys}
          onOpenChange={this.onOpenChange}
          inlineCollapsed={this.props.collapsed}
          onClick={this.handleClick}
        >
          <Menu.Item key="0">
            <Link to="/home">
              <Icon type="home" />
              <span>首页</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="1">
            <Link to="/app/list">
              <Icon type="home" />
              <span>存证管理</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/home">
              <Icon type="home" />
              <span>应用管理</span>
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

const mapState = state => ({
  collapsed: state.header.collapsed,
  menus: state.slider.menus,
})

export default withRouter(connect(mapState, null)(SideMenuUI));