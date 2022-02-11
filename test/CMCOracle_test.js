
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledContractJson = require('../build/contracts/RequestOracle.json');

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  const deploymentKey = Object.keys(compiledContractJson.networks)[0];

  contractInstance = await new web3.eth.Contract(compiledContractJson.abi, compiledContractJson.networks[deploymentKey].address);
});


describe('Testing Oracles', () => {
  it('Contract deployed to testnet', () => {
    console.log(contractInstance.options.address);
    console.log(accounts);

    assert.ok(contractInstance.options.address);
  });

});
