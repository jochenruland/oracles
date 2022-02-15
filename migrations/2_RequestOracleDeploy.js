const RequestOracle = artifacts.require("RequestOracle");

// Do not forget to pass constructor arguments to deploy function
module.exports = function (deployer) {
  deployer.deploy(RequestOracle);
};
