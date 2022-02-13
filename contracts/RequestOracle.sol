// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./CMCOracle.sol";

contract RequestOracle {
  CMCOracle public cmcO;
  uint public ethMC;

  function requestCMCOracle() external {
    ethMC = cmcO.getCMCData();
  }
}
