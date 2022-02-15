//SPDX-License-Identifier: Unlicense
pragma solidity >=0.6.0 <0.9.0;

contract CMCOracle {
    address public owner;

    uint public ethPrice;

    event CallbackGetEthCap(uint id);

    constructor() {
        owner = msg.sender;
    }

    function initCMCDataUpdate() public {
        emit CallbackGetEthCap(1);
    }

    function feedCMCData(uint _ethPrice) public onlyOwner {
      ethPrice = _ethPrice;
    }

    modifier onlyOwner() {
      require(msg.sender == owner, "Only owner can execute this function");
      _;
    }
}
