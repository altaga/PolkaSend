import React, { Component } from 'react';
import Ctransactions from './utils/cryptotransactions';
import ContextModule from '../../../../../utils/contextModule';
import { networks } from "./utils/networks";

function epsilonRound(num) {
    const zeros = 6;
    return Math.round((num + Number.EPSILON) * Math.pow(10, zeros)) / Math.pow(10, zeros)
}

class Crypto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
            account: "",
            provider: "",
            transactions: []
        };
        this.axios = require('axios');
        this.CancelToken = require('axios').CancelToken;
        this.source = this.CancelToken.source();
    }

    static contextType = ContextModule;

    async componentDidMount() {
        let balance = await this.context.value.provider.getBalance(this.context.value.cryptoaddress.address);
        this.context.setValue({ cryptobalance: balance / 1000000000000000000 });
        let transactions = await networks[595].getTransactions(this.context.value.cryptoaddress.address);
        this.setState({ transactions: transactions });
    }

    componentWillUnmount() {
        this.source.cancel("Component got unmounted");
    }

    render() {
        return (
            <div style={{
                height: '100vh',
                fontSize: '1.4em',
                paddingBottom: '10px',
            }}>
                <div>
                    <a
                        href={`${this.state.provider.explorer}address/${this.state.account}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {"\n" + this.state.account.substring(0, 21) + "\n" + this.state.account.substring(21, 42)}
                    </a>
                </div>
                <div>
                    Network :
                    <span style={{
                        color: networks[595].color
                    }}>
                        {" "}{networks[595].name}
                    </span>
                </div>
                <div>
                    Balance:{" "} {epsilonRound(this.context.value.cryptobalance)}{" "} &nbsp;
                    {
                        networks[595].icon && <img src={networks[595].icon} alt="icon" width="30px"></img>
                    }
                </div>
                <hr />
                <div style={{ paddingBottom: "10px" }}>
                    Transactions:
                </div>
                <Ctransactions transactions={this.state.transactions} />
            </div>
        );
    }
}

export default Crypto;