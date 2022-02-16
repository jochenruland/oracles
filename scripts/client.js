//----------------Imports to interact and test smart contracts--------------------
const Web3 = require('web3');
const provider = new Web3.providers.HttpProvider('http://localhost:8545');

const web3 = new Web3(provider);

//---------------Interacting with the contract via web3---------------------------

const compiledContractJson = require('../build/contracts/RequestOracle.json');
const deploymentKey = Object.keys(compiledContractJson.networks)[0];
const contractInstance =new web3.eth.Contract(compiledContractJson.abi, compiledContractJson.networks[deploymentKey].address);

  // Get oracle address
const compiledOracleJson = require('../build/contracts/CMCOracle.json');
const oracleDeploymentKey = Object.keys(compiledOracleJson.networks)[0];
const oracleAddress = compiledOracleJson.networks[oracleDeploymentKey].address;

//---------------------------------------------------------------------------------
let accounts;

const requestOracleData = async (addrOracle) => {
  accounts = await web3.eth.getAccounts();
  await contractInstance.methods.initOracle(addrOracle).send({from: accounts[0]});
  await contractInstance.methods.requestCMCOracleUpdate().send({from: accounts[0]});
}

const getOracleData = async () => {
  await contractInstance.methods.requestCMCOracleData().send({from: accounts[0]});
  const ethPrice = await contractInstance.methods.ethPrice().call();
  console.log(ethPrice);
}

const main = async () => {
  await requestOracleData(oracleAddress);
  await getOracleData();
}

main();
