const CMCOracle = artifacts.require("CMCOracle.sol");

// Do not forget to pass constructor arguments to deploy function
module.exports = function (deployer) {
  deployer.deploy(CMCOracle);
};
