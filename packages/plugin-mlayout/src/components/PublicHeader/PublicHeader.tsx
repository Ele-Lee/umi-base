import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { HeaderMenuItem } from '@grfe/plugin-sub-utils/es/typing';
import { renderCustomMenu, deliveryMenuNode } from '@grfe/plugin-sub-utils/es';

// import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
// import { globalHeaderHeight } from 'config/settings';

const { Header } = Layout;

interface Props {
  headerMenuList: Array<HeaderMenuItem>;
  logo: string;
  title: string;
  globalHeaderHeight: number;
}

const PublicHeader = ({ headerMenuList = [], logo, title, globalHeaderHeight = 60 }: Props) => {
  const headerStyle = {
    height: globalHeaderHeight,
  };

  return (
    <div className="reset-antd" style={headerStyle}>
      <Header style={headerStyle} className="mlayout-publicHeader">
        {logo && (
          <section className="mlayout-publicHeader-LogoWrap">
            <div className="mlayout-publicHeader-Logo">
              <img src={logo} alt="" />
              <span>{title}</span>
            </div>
          </section>
        )}
        <Menu
          mode="horizontal"
          style={{
            lineHeight: `${globalHeaderHeight}px`,
            height: `${globalHeaderHeight}px`,
            textAlign: 'right',
          }}
          selectedKeys={[]}
        >
          {deliveryMenuNode(renderCustomMenu, headerMenuList)}
        </Menu>
      </Header>
    </div>
  );
};

export default React.memo(PublicHeader);
