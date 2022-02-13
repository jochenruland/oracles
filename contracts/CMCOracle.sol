//SPDX-License-Identifier: Unlicense
pragma solidity >=0.6.0 <0.9.0;

contract CMCOracle {
    address public owner;

    uint public ethMarketCap;

    event CallbackGetEthCap();

    constructor() {
        owner = msg.sender;
    }

    function initCMCDataUpdate() public {
        emit CallbackGetEthCap();
    }

    function feedCMCData(uint cap) public onlyOwner {
      ethMarketCap = cap;
    }

    function getCMCData() public view returns(uint) {
      return ethMarketCap;
    }

    modifier onlyOwner() {
      require(msg.sender == owner, "Only owner can execute this function");
      _;
    }
}
