
//----------------Imports to retrieve data from coinmakretcap api-------------------
const apiKeys = require('../API_KEYS.json');
const axios = require('axios');

//----------------Imports to interact and test samart contracts--------------------
const Web3 = require('web3');
const provider = new Web3.providers.WebsocketProvider('http://localhost:8545');

const web3 = new Web3(provider);

//---------------Interacting with the contract via web3---------------------------

const compiledContractJson = require('../build/contracts/CMCOracle.json');
const deploymentKey = Object.keys(compiledContractJson.networks)[0];
const contractInstance =new web3.eth.Contract(compiledContractJson.abi, compiledContractJson.networks[deploymentKey].address);

//---------------------------------------------------------------------------------

let response = null;

const promiseGetApiData = new Promise(async (resolve, reject) => {
  try {
    response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=1027&convert=EUR', {
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
    //console.log(json);
    resolve(json);
  }
});

const getApiData = async () => {
    const apiData = await promiseGetApiData;
    const {EUR} = apiData.data['1027'].quote
    console.log(EUR.price)
    return EUR.price;
}

const updateCMCOracle = async () => {
  accounts = await web3.eth.getAccounts();

  // emit event by calling respective contract function
  //await contractInstance.methods.initCMCDataUpdate().send({from: accounts[0]});


  // if we do not specify the block in the filter the function will select from the last block
  //const eventInfo = await contractInstance.getPastEvents('CallbackGetEthCap',{/*filter: {on indexed fields},*/ fromBlock: 3804});
  //console.log(eventInfo);


  // reading an event in realtime by using a websocket
  let options = {
      /*filter: {
          value: [],
      },
      fromBlock: 0*/
  }

  // works only in combination with Web3.providers.WebsocketProvider
  contractInstance.events.CallbackGetEthCap(options).on('data', async (event) => {
    console.log('Event handled')
    let eur = await getApiData();
    eur = parseInt(eur * 100);
    await contractInstance.methods.feedCMCData(eur).send({from: accounts[0]});
    console.log(eur);

  });

  //await contractInstance.methods.initCMCDataUpdate().send({from: accounts[0]});


}


updateCMCOracle();




/*
  // const owner = await contractInstance.methods.owner().call()

  await contractInstance.methods.CallbackGetEthCap().call().watch(async (err, event) => {
    fetch.fetchUrl('https://api.coinmarketcap.com/vl/global/', (err, m, b) => {
      const cmcJson = JSON.parse(b.toString());
      const ethMarketCap = parseInt(cmcJson.total_market_cap_usd)

      //Send data back to contact on-chain
      await contractInstance.methods.feedCMCData(ethMarketCap).send({from accounts[0]});

    })
  });


*/
