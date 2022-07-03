import './App.css';
import React, { Component } from 'react';
import { Input, Row, Col, Card, CardHeader, CardBody } from "reactstrap"
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from "web3";
import Sound from "react-sound"
import Confetti from 'react-confetti'
import yay from "./yay.mp3"

const width = window.innerWidth
const height = window.innerHeight

const names = [
  "ADDRESS.json",
  "DEX.json",
  "EVM.json",
  "EVMAccounts.json",
  "Homa.json",
  "Honzon.json",
  "IDEX.json",
  "IEVM.json",
  "IEVMAccounts.json",
  "IHoma.json",
  "IHonzon.json",
  "Incentives.json",
  "InterfaceIncentives.json",
  "IOracle.json",
  "ISchedule.json",
  "IStableAsset.json",
  "MultiCurrency.json",
  "NFT.json",
  "Oracle.json",
  "Schedule.json",
  "StableAsset.json",
  "Token.json",
]

var axios = require('axios');

var configGas = {
  method: 'get',
  url: 'https://XXXXXXXXX.com/getGas',
  headers: {},
};

async function CheckGas() {
  return new Promise(
    (resolve, reject) => {
      axios(configGas)
        .then(function (response) {
          resolve(response.data.result);
        })
        .catch(function (error) {
          reject(error);
        });
    }
  )
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bytecode: null,
      bytecodeCheck: true,
      bytecodeJSON: null,
      metamask: false,
      current: "",
      gas: {
        gasPrice: "0x00",
        gasLimit: "0x00"
      },
      balance: 0,
      contractAddress: null,
      contracts: [],
      precompiled: false,
      yaystatus: Sound.status.STOP
    }
    this.connectMetamask = this.connectMetamask.bind(this)
    this.uploadContract = this.uploadContract.bind(this)
    this.web3 = null
  }

  async connectMetamask() {
    const provider = await detectEthereumProvider();
    if (provider) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      accounts.length > 0 &&
        this.setState({
          metamask: true,
          current: accounts
        }, async () => {
          this.web3 = new Web3(window.ethereum)
          let balance = await this.web3.eth.getBalance(accounts[0]) / 1000000000000000000
          this.setState({
            balance
          })
        })
    } else {
      console.log('Please install MetaMask!');
    }
  }

  async uploadContract() {
    console.log(this.state.bytecodeJSON)
    const tx = {
      from: this.state.current[0],
      data: this.state.bytecodeJSON
    }
    const gas = await CheckGas()
    const transaction = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [{
        ...tx,
        gasPrice: gas.gasPrice
      }],
    });
    let check = null
    check = setInterval(async () => {
      let res = await this.web3.eth.getTransactionReceipt(transaction)
      if (res) {
        this.setState({
          contractAddress: res.contractAddress,
          yaystatus: Sound.status.PLAYING
        },
          () => clearInterval(check)
        )
      }
    }, 1000);
  }

  async componentDidMount() {
    this.setState({
      contracts: names.map((item) => require(`@acala-network/contracts/build/contracts/${item}`))
    })
    const gas = await CheckGas()
    this.setState({ gas })
    const provider = await detectEthereumProvider();
    if (provider) {
      window.ethereum.on('accountsChanged', (accounts) => {
        this.setState({
          metamask: accounts.length > 0 ? true : false
        })
        console.log(accounts)
      })
    }
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div className="App">
        <Sound
          url={yay}
          playStatus={this.state.yaystatus}
          playFromPosition={1000 /* in milliseconds */}
        />
        <Row md="2" style={{ margin: "40px 100px 40px" }}>
          <Col>
            <Card >
              <CardHeader
                style={{
                  fontSize: "1.5rem",
                  color: "white",
                  background: "#b13e64"
                }}>
                Minimum ACA to Deploy contract : 
                <br/>
                {
                  ((parseInt(this.state.gas.gasLimit, 16) * parseInt(this.state.gas.gasPrice, 16)) / 1000000000000000000)
                }
                {" ACA"}
              </CardHeader>
              <CardBody
                style={{
                  fontSize: "1.5rem",
                  color: "white",
                  background: "#b13e64bb"
                }}>
                Use this parameters on Metamask : <br />
                GasLimit: {parseInt(this.state.gas.gasLimit, 16)} <br />
                GasPrice: {parseInt(this.state.gas.gasPrice, 16) / 1000000000}
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card >
              <CardHeader
                style={{
                  fontSize: "1.5rem",
                  color: "white",
                  background: "#b13e64"
                }}>
                <span style={{
                  fontSize: "1.5rem"
                }}>
                  Your Balance : {this.state.balance} {" ACA"}
                </span>
              </CardHeader>
              <CardBody
                style={{
                  fontSize: "1.5rem",
                  color: "white",
                  background: "#b13e64bb"
                }}>
                <span style={{
                  fontSize: "1.5rem",
                  color: "black"
                }}>
                  {
                    this.state.metamask ? <>{!(this.state.balance >= ((parseInt(this.state.gas.gasLimit, 16) * parseInt(this.state.gas.gasPrice, 16)) / 1000000000000000000)) ? " Get More ACA" : <span style={{ color: "white" }}>You have enough ACA</span>}</> : <>
                      <button
                        style={{
                          fontSize: "1.5rem",
                          borderRadius: "50px",
                          padding: "10px 20px 10px",
                          color: "white",
                          background: "#b13e64"
                        }}
                        onClick={() => {
                          this.connectMetamask()
                        }}>
                        Connect Metamask
                      </button>
                    </>
                  }
                </span>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <hr />
        {
          this.state.metamask &&
          <>
            <div style={{ color: "black", fontSize: "2rem" }}>
              Upload your Bytecode or Select an Acala Precompiled Contract
            </div>
            <Row md="2" style={{ paddingTop: "50px", margin: "0px 100px 10px" }}>
              <Col>
                <Card>
                  <CardHeader
                    style={{
                      fontSize: "1.5rem",
                      color: "white",
                      background: "#b13e64"
                    }}
                  >
                    Raw Remix Bytecode
                  </CardHeader>
                  <CardBody
                    style={{
                      fontSize: "1.5rem",
                      color: "white",
                      background: "#b13e64bb"
                    }}
                  >
                    <Input
                      bsSize="lg"
                      style={{
                        borderColor: !this.state.bytecodeJSON ? (this.state.bytecodeCheck ? "" : "red") : "green",
                        width: "100%"
                      }}
                      onChange={(e) => {
                        this.setState({
                          bytecode: e.target.value,
                          precompiled: false
                        })
                      }}
                      placeholder="Contract Bytecode" />
                  </CardBody>
                </Card>
              </Col>
              <Col>
                <Card>
                  <CardHeader
                    style={{
                      fontSize: "1.5rem",
                      color: "white",
                      background: "#b13e64"
                    }}
                  >
                    Precompiled ACA Bytecode
                  </CardHeader>
                  <CardBody
                    style={{
                      fontSize: "1.5rem",
                      color: "white",
                      background: "#b13e64bb"
                    }}
                  >
                    <Input
                      bsSize="lg"
                      style={{
                        borderColor: !this.state.bytecodeJSON ? (this.state.bytecodeCheck ? "" : "red") : "green",
                        width: "100%"
                      }}
                      onChange={(e) => {
                        this.setState({
                          bytecode: e.target.value,
                          precompiled: true
                        })
                      }}
                      type="select"
                      placeholder="Contract Bytecode"
                      defaultValue="select"
                    >
                      <option disabled value={"select"}>Select Contract</option>
                      {
                        this.state.contracts.map((item, index) => <option key={index + "contract"} value={item.bytecode}>{names[index]}</option>)
                      }
                    </Input>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <br />
            <button
              style={{
                fontSize: "1.5rem",
                borderRadius: "50px",
                padding: "10px 20px 10px",
                color: "white",
                background: "#b13e64"
              }}
              onClick={() => {
                try {
                  if (this.state.precompiled) {
                    this.setState({
                      bytecodeJSON: this.state.bytecode,
                      bytecodeCheck: true
                    })
                  }
                  else {
                    let json = JSON.parse(this.state.bytecode).object
                    this.setState({
                      bytecodeJSON: json,
                      bytecodeCheck: true
                    })
                  }
                } catch (error) {
                  this.setState({
                    bytecodeCheck: false
                  })
                }
              }}>
              Upload Bytecode
            </button>
            <br />
            <span style={{ fontSize: "1.5rem" }}>
              {
                this.state.bytecodeJSON ? "Bytecode Ready" : "Bytecode Not Ready"
              }
            </span>
            {
              this.state.bytecodeJSON &&
              <>
                <p />
                <button
                  style={{
                    fontSize: "1.5rem",
                    borderRadius: "50px",
                    padding: "10px 20px 10px",
                    color: "white",
                    background: "#b13e64"
                  }}
                  disabled={!(this.state.balance >= ((parseInt(this.state.gas.gasLimit, 16) * parseInt(this.state.gas.gasPrice, 16)) / 1000000000000000000))}
                  onClick={() => {
                    this.uploadContract()
                  }}>
                  {
                    this.state.balance >= ((parseInt(this.state.gas.gasLimit, 16) * parseInt(this.state.gas.gasPrice, 16)) / 1000000000000000000) ? "Upload Contract" : "Get More ACA"
                  }
                </button>
                <p />
                <p />
                <span
                  style={{
                    fontWeight: "bolder",
                    fontSize: "1.5rem",
                  }}
                >
                  {
                    this.state.contractAddress &&
                    <>
                      {"Contract Address : " + this.state.contractAddress}
                    </>
                  }
                </span>
                {
                  this.state.contractAddress &&
                  <Confetti
                    width={width}
                    height={height}
                  />
                }
              </>
            }
          </>
        }
      </div>
    );
  }
}

export default App;
