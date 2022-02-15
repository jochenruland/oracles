// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./CMCOracle.sol";

contract RequestOracle {
  CMCOracle public cmcO;
  uint public ethPrice;

  function initOracle(address _addrCMCOracle) external {
    cmcO = CMCOracle(_addrCMCOracle);
  }

  function requestCMCOracleUpdate() external {
    cmcO.initCMCDataUpdate();
  }

  function requestCMCOracleData() external {
    ethPrice = cmcO.ethPrice();
  }
}
