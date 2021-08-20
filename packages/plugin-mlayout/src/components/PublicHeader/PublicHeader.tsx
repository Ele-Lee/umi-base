import React, { useState, useMemo } from 'react';
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
  headerTabs?: React.Component;
}

const PublicHeader = ({
  headerMenuList = [],
  logo,
  title,
  globalHeaderHeight = 60,
  headerTabs,
}: Props) => {
  const headerStyle = {
    height: globalHeaderHeight,
  };

  const renderTabs = useMemo(() => {
    if (!headerTabs) return null;
    if (typeof headerTabs == 'function') {
      return React.createElement(headerTabs);
    }
    return null;
  }, [headerTabs]);

  return (
    <div className="reset-antd" style={headerStyle}>
      <Header style={headerStyle} className="mlayout-publicHeader">
        {logo && (
          <section className="mlayout-publicHeader__LogoWrap">
            <div className="mlayout-publicHeader__Logo">
              <img src={logo} alt="" />
              <span>{title}</span>
            </div>
          </section>
        )}
        {renderTabs}
        <Menu
          className="mlayout-publicHeader__Menu"
          mode="horizontal"
          style={{
            lineHeight: `${globalHeaderHeight}px`,
            height: `${globalHeaderHeight}px`,
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
