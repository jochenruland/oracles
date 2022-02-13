
const apiKeys = require('../API_KEYS.json');
console.log(apiKeys.coinmarketcap);

/* Example in Node.js */
const axios = require('axios');

let response = null;
new Promise(async (resolve, reject) => {
  try {
    response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=1&convert=EUR', {
      headers: {
        'X-CMC_PRO_API_KEY': apiKeys.coinmarketcap,
      },
    });
  } catch(ex) {
    response = null;
    // error
    console.log(ex);
    reject(ex);
  }

  if (response) {
    // success
    const json = response.data;
    console.log(json);
    resolve(json);
  }
});


/*
const fetch = require('fetch');

const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledContractJson = require('../build/contracts/CMCOracle.json');

async function updateCMCOracle () => {
  accounts = await web3.eth.getAccounts();

  const deploymentKey = Object.keys(compiledContractJson.networks)[0];

  contractInstance = await new web3.eth.Contract(compiledContractJson.abi, compiledContractJson.networks[deploymentKey].address);

  // const owner = await contractInstance.methods.owner().call()

  await contractInstance.methods.CallbackGetEthCap().call().watch(async (err, event) => {
    fetch.fetchUrl('https://api.coinmarketcap.com/vl/global/', (err, m, b) => {
      const cmcJson = JSON.parse(b.toString());
      const ethMarketCap = parseInt(cmcJson.total_market_cap_usd)

      //Send data back to contact on-chain
      await contractInstance.methods.feedCMCData(ethMarketCap).send({from accounts[0]});

    })
  });

});

*/
