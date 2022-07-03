import React, { Component } from 'react';
import { Card, Row, Col, Spinner } from 'reactstrap';
import reactAutobind from 'react-autobind';
import ContextModule from '../../../../utils/contextModule';
import { abi } from '../../../../contract/feedContract';
import { networks } from '../home/components/utils/networks';
import aca from "./images/aca.png";
import avax from "./images/avax.png";
import bnb from './images/bnb.png';
import btc from './images/btc.png';
import dot from "./images/polkadot.png"
import eth from './images/eth.png';
import link from './images/link.png';
import matic from './images/polygon.png';
import neo from "./images/neo.png"
import sol from "./images/sol.png";
import usdc from './images/usdc.png';
import xrp from "./images/xrp.png"

const ethers = require('ethers');
const providerMatic = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com/");
const priceFeed = "0xFE006128fD276f29CDadd330f60be53B53285e8f"

function filterJSONarray(array, key, value) {
    try {
        return array.filter(obj => obj[key] === value);
    }
    catch (err) {
        return [];
    }
}

function epsilonRound(num) {
    const zeros = 2;
    return Math.round((num + Number.EPSILON) * Math.pow(10, zeros)) / Math.pow(10, zeros)
}

class Feeds extends Component {
    constructor(props) {
        super(props);
        this.state = {
            acala: 0,
            avax: 0,
            bnb: 0,
            btc: 0,
            dot: 0,
            eth: 0,
            link: 0,
            matic: 0,
            neo: 0,
            sol: 0,
            usdc: 0,
            xrp: 0,
            prices: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            symbol: ["ACA", "AVAX", "BNB", "BTC", "DOT", "ETH", "LINK", "MATIC", "NEO", "SOL", "USDC", "XRP"],
            icons: [aca, avax, bnb, btc, dot, eth, link, matic, neo, sol, usdc, xrp],
            balance: 0,
        }
        this.axios = require('axios')
        this.CancelToken = require('axios').CancelToken;
        this.source = this.CancelToken.source();
        reactAutobind(this);
        this.mySync = null;
        this._isMounted = true;
    }

    static contextType = ContextModule;

    async syncPrices() {
        let contract = new ethers.Contract(priceFeed, abi(), providerMatic);
        let priceACA = await networks[595].getPrice();
        let priceAVAX = await contract.getLatestAVAXPrice();
        let priceBNB = await contract.getLatestBNBPrice();
        let priceBTC = await contract.getLatestBTCPrice();
        let priceDOT = await contract.getLatestDOTPrice();
        let priceETH = await contract.getLatestETHPrice();
        let priceLINK = await contract.getLatestLINKPrice();
        let priceMATIC = await contract.getLatestMATICPrice();
        let priceNEO = await contract.getLatestNEOPrice();
        let priceSOL = await contract.getLatestSOLPrice();
        let priceUSDC = await contract.getLatestUSDCPrice();
        let priceXRP = await contract.getLatestXRPPrice();

        let prices = {
            aca: priceACA,
            avax: parseFloat((priceAVAX).toString()) / 100000000,
            bnb: parseFloat((priceBNB).toString()) / 100000000,
            btc: parseFloat((priceBTC).toString()) / 100000000,
            dot: parseFloat((priceDOT).toString()) / 100000000,
            eth: parseFloat((priceETH).toString()) / 100000000,
            link: parseFloat((priceLINK).toString()) / 100000000,
            matic: parseFloat((priceMATIC).toString()) / 100000000,
            neo: parseFloat((priceNEO).toString()) / 100000000,
            sol: parseFloat((priceSOL).toString()) / 100000000,
            usdc: parseFloat((priceUSDC).toString()) / 100000000,
            xrp: parseFloat((priceXRP).toString()) / 100000000,
        }
        this._isMounted && this.setState({
            prices: [
                epsilonRound(prices.aca),
                epsilonRound(prices.avax),
                epsilonRound(prices.bnb),
                epsilonRound(prices.btc),
                epsilonRound(prices.dot),
                epsilonRound(prices.eth),
                epsilonRound(prices.link),
                epsilonRound(prices.matic),
                epsilonRound(prices.neo),
                epsilonRound(prices.sol),
                prices.usdc,
                epsilonRound(prices.xrp),
            ],
        })
    }

    async componentDidMount() {
        let balance = await this.context.value.provider.getBalance(this.context.value.cryptoaddress.address);
        this.context.setValue({ cryptobalance: balance / 1000000000000000000 });
        this.axios({
            method: 'get',
            url: 'https://XXXXXXXXXXXX.com/get-account-balance',
            headers: {
                'ewallet': this.context.value.ewallet,
            },
            cancelToken: this.source.token
        })
            .then((response) => {
                const myArray = filterJSONarray(response.data.data.accounts, "currency", "USD")
                if (myArray.length > 0) {
                    this.context.setValue({
                        balance: myArray[0].balance,
                    });
                }
                else {
                    console.log("No Balance");
                }
            })
            .catch((error) => {
                console.log(error);
            });
        this.syncPrices();
        this.mySync = setInterval(() => {
            this.syncPrices();
        }, 1000 * 5);
    }

    componentWillUnmount() {
        clearInterval(this.mySync);
        this.source.cancel("Component got unmounted");
        this._isMounted = false;
    }

    render() {
        return (
            <>
                <div
                    className='feedHeader'
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <div style={{
                        paddingTop: "1rem",
                        fontSize: "1.4rem",
                    }}>
                        <div>
                            Total Balance
                        </div>
                        <div style={{
                            fontSize: '1.8rem',
                            fontWeight: 'bold',
                        }}>
                            ${epsilonRound(this.context.value.balance + this.context.value.cryptobalance * this.state.prices[0])} USD
                        </div>
                    </div>
                </div>
                <p />
                <hr />
                {
                    this.state.prices.length > 0 ?
                        <div
                            className='feedBody'
                            style={{
                                overflowX: 'hidden',
                                overflowY: 'scroll',
                            }}>
                            {
                                this.state.prices.map((price, index) => {
                                    return (
                                        <div key={"price" + index} style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            <Card
                                                style={{
                                                    margin: '10px',
                                                    padding: '10px',
                                                    width: '90vw',
                                                    borderColor: '#b13e64',
                                                }}>
                                                <Row md="3">
                                                    <Col xs="4" style={{
                                                        fontSize: '20px',
                                                        fontWeight: 'bold',
                                                    }}>{this.state.symbol[index]}
                                                    </Col>
                                                    <Col xs="2" style={{
                                                        fontSize: '20px',
                                                        fontWeight: 'bold',
                                                    }}><img src={this.state.icons[index]} style={{
                                                        width: '50px',
                                                    }} />
                                                    </Col>
                                                    <Col xs="6" style={{
                                                        fontSize: '20px',
                                                        fontWeight: 'bold',
                                                    }}>
                                                        ${price}
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        :
                        <div xs="12"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingTop: '26vh',
                            }}
                        ><Spinner style={{
                            color: "#b13e64",
                            width: "10vh",
                            height: "10vh"
                        }} />
                        </div>
                }
            </>
        );
    }
}

export default Feeds;