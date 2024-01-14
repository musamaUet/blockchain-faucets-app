// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

// They can only inherit from other interfaces but not from other contract classes.
// They cannot declare a constructor, and also not state variables.
// All declared functions should be external.

interface IFaucet {
    function addFunds() external payable;
    function withdraw(uint withDrawAmount) external;
}