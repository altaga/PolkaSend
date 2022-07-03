import React, { Component } from 'react';
import reactAutobind from 'react-autobind';
import { Col, Modal, ModalBody, ModalHeader, ModalFooter, Row } from 'reactstrap';
import ContextModule from '../../../utils/contextModule';
import QR from '../../../assets/img/qr.png';
import check from '../../../assets/img/check.png';
import QRCode from "react-qr-code";
import { QrReader } from 'react-qr-reader';
import { isMobile } from 'react-device-detect';
import Keypad from './keypad';
import { ethers } from "ethers";

class MyQRModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            screen: 1,
            data: '',
            constraints: {
                facingMode: 'environment'
            },
            changeCamera: false,
            amount: 0,
            sending: false,
            txHash: '',
        };
        reactAutobind(this);
    }

    static contextType = ContextModule;

    sendMoney() {
        this.setState({
            sending: true,
        }, async () => {
            const tx = {
                from: this.context.value.cryptoaddress.address,
                to: this.state.data,
                value: ethers.utils.parseEther(this.state.amount.toString())
            }
            let gas = await this.context.value.provider.estimateGas(tx);
            const createTransaction = await this.context.value.eth.accounts.signTransaction(
                {
                    ...tx,
                    gas: gas
                },
                this.context.value.cryptowallet
            );
            const createReceipt = await this.context.value.eth.sendSignedTransaction(createTransaction.rawTransaction);
            this.setState({
                txHash: createReceipt.transactionHash,
                sending: false,
                screen: 4,
            })
        });
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.isOpen}>
                    <ModalHeader style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100px',
                    }}>
                        <button
                            className='roundButton'
                            style={{
                                width: '90vw',
                            }}
                            onClick={() =>
                                this.setState({
                                    isOpen: !this.state.isOpen,
                                    screen: 1,
                                    data: '',
                                    amount: 0,
                                    sending: false,
                                    txHash: '',
                                })}>
                            Close
                        </button>
                    </ModalHeader>
                    <ModalBody>
                        {
                            this.state.screen === 1 &&
                            <div style={{ background: 'white', padding: '16px' }}>
                                <QRCode value={this.context.value.cryptoaddress.address} />
                            </div>
                        }
                        {
                            this.state.screen === 2 &&
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '52vh',
                            }}>
                                {
                                    !this.state.changeCamera &&
                                    <QrReader
                                        onResult={(result, error) => {
                                            if (!!result) {
                                                this.setState({
                                                    data: result?.text,
                                                    screen: 3,
                                                });
                                            }
                                        }}
                                        style={{ width: '100%', height: '100%' }}
                                        scanDelay={1000}
                                        constraints={this.state.constraints}
                                    />
                                }
                                {
                                    (isMobile && this.state.screen === 2) &&
                                    <div style={{
                                        marginTop: "auto",
                                    }}>
                                        <div style={{
                                            marginTop: "10px"
                                        }}>
                                            <button className='roundButton' style={{
                                                width: '86vw',
                                            }}
                                                onClick={() => {
                                                    if (this.state.constraints.facingMode === 'environment') {
                                                        this.setState({
                                                            constraints: {
                                                                facingMode: 'user'
                                                            },
                                                            changeCamera: true,
                                                        }, () => this.setState({
                                                            changeCamera: false,
                                                        }));
                                                    }
                                                    else {
                                                        this.setState({
                                                            constraints: {
                                                                facingMode: 'environment'
                                                            },
                                                            changeCamera: true,
                                                        }, () => this.setState({
                                                            changeCamera: false,
                                                        }));
                                                    }
                                                }}>
                                                Toogle Camera
                                            </button>
                                        </div>
                                    </div>
                                }
                            </div>
                        }
                        {
                            this.state.screen === 3 &&
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '52vh',
                            }}>
                                <Row md="1">
                                    <Col style={{
                                        wordWrap: 'break-word',
                                        fontSize: '1.3rem',
                                    }}
                                        xs="12">
                                        To Address : {this.state.data.substring(0, 6) + '...' + this.state.data.substring(this.state.data.length - 6)}
                                    </Col>
                                    <Col xs="12"
                                        style={{
                                            marginTop: '10px',
                                            fontSize: '2rem',
                                        }}>
                                        {
                                            this.state.amount
                                        }
                                    </Col>
                                    <Col xs="12">
                                        <Keypad update={(e) => this.setState({ amount: e })} />
                                    </Col>
                                    <Col xs="12">
                                        <button className='roundButton'
                                            onClick={() => {
                                                this.sendMoney();
                                            }}
                                            disabled={this.state.sending || parseFloat(this.state.amount) > this.context.value.cryptobalance || parseFloat(this.state.amount) <= 0}
                                            style={{
                                                width: '90vw',
                                                marginTop: '14px',
                                            }}>
                                            {
                                                this.state.sending ?
                                                    "Sending..." :
                                                    "Send"
                                            }
                                        </button>
                                    </Col>
                                </Row>
                            </div>
                        }
                        {
                            this.state.screen === 4 &&
                            <Row>
                                <Col xs="12">
                                    <img src={check} style={{
                                        width: '70vw',
                                    }} />
                                </Col>
                                <Col xs="12" style={{
                                    marginTop: '4vh',
                                }}>
                                    <div>
                                        <h1>Transaction Successful</h1>
                                        <h2>Transaction Hash</h2>
                                        <h3>
                                            <a href={`https://blockscout.mandala.acala.network/tx/${this.state.txHash}`} target="_blank" rel="noopener noreferrer">
                                                {
                                                    this.state.txHash.substring(0, 10) + '...' + this.state.txHash.substring(this.state.txHash.length - 10)
                                                }
                                            </a>
                                        </h3>
                                    </div>
                                </Col>
                            </Row>
                        }
                    </ModalBody>
                    <ModalFooter style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: '100px',
                    }}>
                        <button
                            className='roundButton'
                            style={{
                                width: '40vw',
                            }}
                            onClick={() => this.setState({
                                screen: 1,
                                data: '',
                                amount: 0,
                                sending: false,
                                txHash: '',
                            })}>
                            Recieve
                        </button>
                        <button
                            className='roundButton'
                            style={{
                                width: '40vw',
                            }}
                            onClick={() => this.setState({
                                screen: 2,
                            })}>
                            Send
                        </button>
                    </ModalFooter>
                </Modal>
                <img src={QR} alt="qr" style={{ height: "6vh" }} onClick={() => this.setState({
                    isOpen: !this.state.isOpen,
                })} />
            </div>
        );
    }
}

export default MyQRModal;