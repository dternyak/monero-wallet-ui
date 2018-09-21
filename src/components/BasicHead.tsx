import React from 'react';
import Head from 'next/head';

import 'styles/style.less';

export default class BasicHead extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <Head>
          <title>MoneroWallet</title>
        </Head>

        {children}
      </div>
    );
  }
}
