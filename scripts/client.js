const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledContractJson = require('../build/contracts/RequestOracle.json');

const accounts = await web3.eth.getAccounts();

const deploymentKey = Object.keys(compiledContractJson.networks)[0];

contractInstance = await new web3.eth.Contract(compiledContractJson.abi, compiledContractJson.networks[deploymentKey].address);

async function printOracleData() {
  await contractInstance.methods.requestCMCOracle().send({from: accounts[0]});
  const ethCap = await contractInstance.methods.ethMC().call();
  console.log(ethCap);
}
