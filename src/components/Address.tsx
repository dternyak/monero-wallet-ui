import * as React from "react";
import { ExtendedLedgerDevice } from "types";

interface Props {
	wallet: ExtendedLedgerDevice;
}

class Address extends React.Component<Props> {
	public render = () => {
		return (
			<div>
				<h1>{this.props.wallet.address}</h1>
			</div>
		);
	};
}

export default Address;
