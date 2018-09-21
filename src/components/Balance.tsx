import * as React from 'react';
import { ExtendedLedgerDevice } from 'types';
import { MyMoneroApi } from '@xmr-core/xmr-mymonero-libs';
import { formatMoneyWithSymbol } from '@xmr-core/xmr-money';
import { Decimal } from 'decimal.js';
import { serverToMonero } from 'units';

interface Props {
  wallet: ExtendedLedgerDevice;
  onBalanceLoad: any;
}

interface State {
  balance: string;
}

async function fetchBalance(wallet) {
  const { address, privateViewKey, spend_public_key, spendKey, dev } = wallet;
  const addressInfo = await MyMoneroApi.addressInfo(
    address,
    privateViewKey,
    spend_public_key,
    spendKey,
    dev
  );

  const {
    total_received,
    total_sent,
    locked_balance,
    ratesBySymbol
  } = addressInfo;

  const fmt = formatMoneyWithSymbol;
  const fmtUsd = (str: string) =>
    (Number(str.split(' ')[0]) * ratesBySymbol.USD).toFixed(2);

  const sent = fmt(total_sent);
  const recv = fmt(total_received);
  const recvInt = recv;
  const locked = fmt(locked_balance);
  const lockedInt = locked_balance;
  const currUnformatted = total_received.subtract(total_sent);
  const curr = fmt(currUnformatted);
  const currInt = new Decimal(serverToMonero(currUnformatted));

  const sentUsd = fmtUsd(sent);
  const recvUsd = fmtUsd(recv);
  const lockedUsd = fmtUsd(locked);
  const currUsd = fmtUsd(curr);

  return {
    sent,
    sentUsd,
    recv,
    recvUsd,
    locked,
    lockedUsd,
    currFormatted: curr,
    currUsd,
    recvInt,
    lockedInt,
    currInt
  };
}

class Balance extends React.Component<Props, State> {
  state = {
    balance: null
  };

  componentDidMount = () => {
    this.getMyBalance();
  };

  getMyBalance = async () => {
    const balanceInfo = await fetchBalance(this.props.wallet);
    this.setState({ balance: balanceInfo.currFormatted });
    const { onBalanceLoad } = this.props;
    onBalanceLoad(balanceInfo.currInt);
  };

  public render = () => {
    return (
      <div>
        {this.state.balance ? (
          <h1>{this.state.balance.toString()}</h1>
        ) : (
          <h3>Loading balance...</h3>
        )}
      </div>
    );
  };
}

export default Balance;
