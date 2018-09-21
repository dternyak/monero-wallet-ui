import * as React from 'react';

import { Button, Form, Input } from 'antd';
import { decode_address, NetType } from '@xmr-core/xmr-crypto-utils';
import { DONATION } from 'config';
import { Decimal } from 'decimal.js';
import {
  sendFundsSimple,
  sendFundsStatusToMessage
} from '@xmr-core/xmr-mymonero-libs/lib/mymonero-send-tx';
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 }
};

function validateAddressChange(address: string) {
  try {
    decode_address(address, NetType.MAINNET);
    return null;
  } catch (e) {
    return 'This address is not valid';
  }
}

function validateAmountChange(amount: string, balance: Decimal) {
  try {
    const BNAmount = new Decimal(amount);
    if (balance.gt(BNAmount)) {
      return null;
    } else {
      // TODO also check tx fee, not just balance
      return 'This amount is greater than balance';
    }
  } catch (e) {
    return 'This amount is not valid';
  }
}

class NewSendForm extends React.Component {
  state = {
    submitLoading: false,
    latestTxHash: null,
    amount: {
      value: '',
      errorMsg: null
    },
    to: {
      value: '',
      errorMsg: null
    },
    disabled: true
  };

  isDisabled = () => {
    if (this.state.amount.value && this.state.to.value) {
      if (!this.state.amount.errorMsg && !this.state.to.errorMsg) {
        this.setState({ disabled: false });
      }
    }
  };

  handleAddressChange = event => {
    const { value } = event.target;
    this.setState({
      to: {
        errorMsg: validateAddressChange(value),
        value
      }
    });
    this.isDisabled();
  };

  submit = async () => {
    this.setState({ submitLoading: true });
    const res = await sendFundsSimple(
      this.state.to.value,
      Number(this.state.amount.value),
      null,
      (status: number) => {
        console.log(
          '[Transaction Status]',
          sendFundsStatusToMessage[status as 1 | 2 | 3 | 4 | 5]
        );
      },
      this.props.wallet.dev
    );
    this.setState({ submitLoading: false, latestTxHash: res.txHash });
  };

  handleAmountChange = event => {
    const { balance } = this.props;
    const { value } = event.target;
    this.setState({
      amount: {
        errorMsg: validateAmountChange(value, balance),
        value
      }
    });
    this.isDisabled();
  };

  render() {
    const { to, amount } = this.state;
    return (
      <div>
        <FormItem
          {...formItemLayout}
          label="To Address"
          validateStatus={to.errorMsg ? 'error' : 'success'}
          help={to.errorMsg ? to.errorMsg : ''}
        >
          <Input
            name="to"
            type="text"
            placeholder={DONATION}
            value={to.value}
            onChange={this.handleAddressChange}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Amount"
          validateStatus={amount.errorMsg ? 'error' : 'success'}
          help={amount.errorMsg ? amount.errorMsg : ''}
        >
          <Input
            name="amount"
            type="number"
            placeholder={'1.05'}
            value={amount.value}
            addonAfter={'XMR'}
            onChange={this.handleAmountChange}
          />
        </FormItem>
        {this.state.latestTxHash && <><a href={`https://www.exploremonero.com/transaction/${this.state.latestTxHash}`}>View TX On ExploreMonero</a><br/></>}
        <Button
          onClick={this.submit}
          loading={this.state.submitLoading}
          disabled={this.state.disabled}
        >
          Submit
        </Button>
      </div>
    );
  }
}

export default NewSendForm;
