import axios from 'axios';

export const getNFTArbitrum = async (address) => {
    return new Promise((resolve, reject) => {
        var config = {
            method: 'get',
            url: `https://api-testnet.arbiscan.io/api?module=account&action=tokennfttx&address=${address}&page=1&offset=100&sort=desc`,
            headers: {}
        };
        axios(config)
            .then((response) => {
                resolve(response.data.result.map((item) => (
                    {
                        amount: item.to.toLowerCase() === address.toLowerCase() ? item.value : -item.value,
                        gasFee: item.gasUsed,
                        date: new Date(item.timeStamp * 1000),
                        contractAddress: item.contractAddress,
                    }
                )));
            })
            .catch((error) => {
                reject([]);
            });
    });
}

export const getNFTRopsten = async (address) => {
    return new Promise((resolve, reject) => {
        var config = {
            method: 'get',
            url: `https://api-ropsten.etherscan.io/api?module=account&action=tokennfttx&address=${address}&page=1&offset=100&sort=desc`,
            headers: {}
        };
        axios(config)
            .then((response) => {

                resolve(response.data.result.map((item) => (
                    {
                        amount: item.to.toLowerCase() === address.toLowerCase() ? item.value : -item.value,
                        gasFee: item.gasUsed,
                        date: new Date(item.timeStamp * 1000),
                        contractAddress: item.contractAddress,
                    }
                )));
            })
            .catch((error) => {
                reject([]);
            });
    });
}

export const getNFTFantom = async (address) => {
    return new Promise((resolve, reject) => {
        var config = {
            method: 'get',
            url: `https://api-testnet.ftmscan.com/api?module=account&action=tokennfttx&address=${address}&page=1&offset=100&sort=desc`,
            headers: {}
        };
        axios(config)
            .then((response) => {

                resolve(response.data.result.map((item) => (
                    {
                        amount: item.to.toLowerCase() === address.toLowerCase() ? item.value : -item.value,
                        gasFee: item.gasUsed,
                        date: new Date(item.timeStamp * 1000),
                        contractAddress: item.contractAddress,
                    }
                )));
            })
            .catch((error) => {
                reject([]);
            });
    });
}

export const getNFTBnb = async (address) => {
    return new Promise((resolve, reject) => {
        var config = {
            method: 'get',
            url: `https://api-testnet.bscscan.com/api?module=account&action=tokennfttx&address=${address}&page=1&offset=100&sort=desc`,
            headers: {}
        };
        axios(config)
            .then((response) => {

                resolve(response.data.result.map((item) => (
                    {
                        amount: item.to.toLowerCase() === address.toLowerCase() ? item.value : -item.value,
                        gasFee: item.gasUsed,
                        date: new Date(item.timeStamp * 1000),
                        contractAddress: item.contractAddress,
                    }
                )));
            })
            .catch((error) => {
                reject([]);
            });
    });
}

export const getNFTAvax = async (address) => {
    return new Promise((resolve, reject) => {
        var config = {
            method: 'get',
            url: `https://api-testnet.snowtrace.io/api?module=account&action=tokennfttx&address=${address}&page=1&offset=100&sort=desc`,
            headers: {}
        };
        axios(config)
            .then((response) => {

                resolve(response.data.result.map((item) => (
                    {
                        amount: item.to.toLowerCase() === address.toLowerCase() ? item.value : -item.value,
                        gasFee: item.gasUsed,
                        date: new Date(item.timeStamp * 1000),
                        contractAddress: item.contractAddress,
                    }
                )));
            })
            .catch((error) => {
                reject([]);
            });
    });
}

export const getNFTPolygon = async (address) => {
    return new Promise((resolve, reject) => {
        var config = {
            method: 'get',
            url: `https://api-testnet.polygonscan.com/api?module=account&action=tokennfttx&address=${address}&page=1&offset=100&sort=desc`,
            headers: {}
        };
        axios(config)
            .then((response) => {
                resolve(response.data.result.map((item) => (
                    {
                        amount: item.to.toLowerCase() === address.toLowerCase() ? item.value : -item.value,
                        gasFee: item.gasUsed,
                        date: new Date(item.timeStamp * 1000),
                        contractAddress: item.contractAddress,
                    }
                )));
            })
            .catch((error) => {
                reject([]);
            });
    });
}

export const getNFTAcala = async (address) => {
    return new Promise((resolve, reject) => {
        var config = {
            method: 'get',
            url: `https://blockscout.mandala.acala.network/api?module=account&action=tokenlist&address=${address}`,
            headers: {}
        };
        axios(config)
            .then((response) => {
                let temp = response.data.result.filter(x => x.type === "ERC-721")
                resolve(temp.map((item) => (
                    {
                        contractAddress: item.contractAddress,
                    }
                )));
            })
            .catch((error) => {
                reject([]);
            });
    });
}

