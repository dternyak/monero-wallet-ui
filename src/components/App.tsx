import * as React from 'react';
// import "./App.css";
import Balance from './Balance';
import Address from './Address';
// import SendForm from './SendForm';
import NewSendForm from './NewSendForm'
import UnlockLedgerWallet from './UnlockLedgerWallet';
import { ExtendedLedgerDevice } from 'types';
import { Layout } from 'antd';
import { BigInt } from "@xmr-core/biginteger";

const { Header, Content, Footer } = Layout;

interface State {
  wallet: ExtendedLedgerDevice | null;
  balance: BigInt
}

class App extends React.Component<{}, State> {
  state = {
    wallet: null,
    balance: null
  };

  setWallet = (wallet: ExtendedLedgerDevice) => {
    this.setState({ wallet });
  };

  setBalance = (balance: BigInt) => {
    this.setState({balance})
  }

  public render() {
    const { wallet } = this.state;
    return (
      <Layout className="layout">
        <Header>MoneroWallet</Header>
        <Content style={{ padding: '0 50px' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            {wallet ? (
              <>
                <Address wallet={wallet} />
                <Balance wallet={wallet} onBalanceLoad={this.setBalance} />
              {this.state.balance ? <NewSendForm balance={this.state.balance} wallet={wallet}/> : <h1>Loading</h1>}
              </>
            ) : (
              <UnlockLedgerWallet onUnlock={this.setWallet} />
            )}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <a target="_blank" href={"https://github.com/dternyak/monero-wallet"}>GitHub</a>
        </Footer>
      </Layout>
    );
  }
}

export default App;
