const CMCOracletest = artifacts.require("CMCOracletest");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("CMCOracletest", function (/* accounts */) {
  it("should assert true", async function () {
    await CMCOracletest.deployed();
    return assert.isTrue(true);
  });
});
