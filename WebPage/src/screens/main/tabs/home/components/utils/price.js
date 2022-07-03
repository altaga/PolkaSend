import axios from 'axios';

export const getPriceAvax = async (address) => {
    return new Promise((resolve, reject) => {
        var config = {
            method: 'get',
            url: 'https://XXXXXXXXXXXX.com/request',
            headers: {
                'chain': 'avax'
            }
        };

        axios(config)
            .then(function (response) {
                resolve(response.data.usd.price);
            })
            .catch((error) => {
                reject("0");
            });
    });
}

export const getPriceBSC = async (address) => {
    return new Promise((resolve, reject) => {
        var config = {
            method: 'get',
            url: 'https://XXXXXXXXXXXX.com/request',
            headers: {
                'chain': 'bsc'
            }
        };

        axios(config)
            .then(function (response) {
                resolve(response.data.result.ethusd);
            })
            .catch((error) => {
                reject("0");
            });
    });
}

export const getPriceFantom = async (address) => {
    return new Promise((resolve, reject) => {
        var config = {
            method: 'get',
            url: 'https://XXXXXXXXXXXX.com/request',
            headers: {
                'chain': 'fantom'
            }
        };

        axios(config)
            .then(function (response) {
                resolve(response.data.result.ethusd);
            })
            .catch((error) => {
                reject("0");
            });
    });
}

export const getPriceRopsten = async (address) => {
    return new Promise((resolve, reject) => {
        var config = {
            method: 'get',
            url: 'https://XXXXXXXXXXXX.com/request',
            headers: {
                'chain': 'eth'
            }
        };

        axios(config)
            .then(function (response) {
                resolve(response.data.result.ethusd);
            })
            .catch((error) => {
                reject("0");
            });
    });
}

export const getPricePolygon = async (address) => {
    return new Promise((resolve, reject) => {
        var config = {
            method: 'get',
            url: 'https://XXXXXXXXXXXX.com/request',
            headers: {
                'chain': 'polygon'
            }
        };

        axios(config)
            .then(function (response) {
                resolve(response.data.result.maticusd);
            })
            .catch((error) => {
                reject("0");
            });
    });
}
export const getPriceAca = async (address) => {
    return new Promise((resolve, reject) => {
        var config = {
            method: 'get',
            url: 'https://api.coingecko.com/api/v3/simple/price?ids=acala&vs_currencies=usd',
            headers: { 
              'Content-Type': 'application/json', 
              'X-API-Key': '7c358c17a687499da150dd9b4c52610b'
            }
          };
          
          axios(config)
          .then(function (response) {
            resolve(response.data.acala.usd);
          })
          .catch(function (error) {
            reject("0");
          });
    });
}