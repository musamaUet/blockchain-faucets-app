// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Faucet {
 
    address[] public funders;
    receive() external payable {}

    function addFunds() external payable {
        // Msg is a special object that holds some information related to the transaction.
        funders.push(msg.sender);
    }

    function getAllFunders() external view returns(address[] memory) {
        return funders;
    }
}

// Block Info
// Nonce - a hash that when combined with the minHash proofs that the block has gone through proof of work(POW).
// 8 Bytes => 64 Bits