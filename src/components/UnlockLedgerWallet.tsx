import * as React from 'react';
import Transport from '@ledgerhq/hw-transport-u2f';
import { LedgerDevice } from '@xmr-core/xmr-crypto-utils';
import { pubkeys_to_string } from '@xmr-core/xmr-crypto-utils';
import { NetType } from '@xmr-core/xmr-crypto-utils';
import { Button } from 'antd';

interface Props {
  onUnlock: any;
}

class UnlockLedgerWallet extends React.Component<Props> {
  state = {
    deviceUnlockLoading: false
  };

  unlock = async () => {
    this.setState({ deviceUnlockLoading: true });
    const transport = await Transport.create();
    const dev = new LedgerDevice(transport);
    const {
      spend_public_key,
      view_public_key
    } = await dev.get_public_address();
    const address = pubkeys_to_string(
      spend_public_key,
      view_public_key,
      NetType.MAINNET
    );
    const { spendKey } = await dev.get_secret_keys();
    const privateViewKey = await dev.export_private_view_key();
    this.props.onUnlock({
      dev,
      address,
      spend_public_key,
      privateViewKey,
      spendKey
    });
    this.setState({ deviceUnlockLoading: false });
  };

  public render = () => {
    return (
      <div>
        {this.state.deviceUnlockLoading ? (
          <p>Please export your viewkey on your device</p>
        ) : (
          <Button onClick={this.unlock} icon="poweroff" loading={this.state.deviceUnlockLoading}>Unlock Device</Button>
        )}
      </div>
    );
  };
}

export default UnlockLedgerWallet;
