import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import BasicHead from './BasicHead';


interface Props {
  withBreadcrumb?: boolean | null;
}

const { Content } = Layout;

class AntWrap extends React.Component<Props> {

  render() {
    const { children, withBreadcrumb } = this.props;
    return (
      <BasicHead>
        {/*<Header />*/}
        <Content style={{ padding: '0 50px' }}>
          {withBreadcrumb && (
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
          )}
          <div
            style={{
              background: '#fff',
              paddingTop: 50,
              paddingBottom: 50,
              minHeight: 280
            }}
          >
            {children}
          </div>
        </Content>
        {/*<Footer />*/}
      </BasicHead>
    );
  }
}
export default AntWrap;
