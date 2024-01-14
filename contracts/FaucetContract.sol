// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Faucet {
 
    uint public numOfFunders;
    mapping(address => bool) private funders;
    mapping(uint => address) private lutFunders;
    receive() external payable {}

    function addFunds() external payable {
        // Msg is a special object that holds some information related to the transaction.
        address funder = msg.sender;
        if(!funders[funder]) {
            uint index = numOfFunders++;
            funders[funder] = true;
            lutFunders[index] = funder;
        }

    }

    function getAllFunders() external view returns(address[] memory) {
        address[] memory _funders = new address[](numOfFunders);

        for(uint i = 0; i< numOfFunders; i++) {
            _funders[i] = lutFunders[i];
        }

        return _funders;
    }

    function getFunderAtIndex(uint8 index) external view returns(address) {
        return lutFunders[index];
    }
}

// Block Info
// Nonce - a hash that when combined with the minHash proofs that the block has gone through proof of work(POW).
// 8 Bytes => 64 Bits


// const instance = await Faucet.deployed();
// instance.addFunds({from: accounts[0], value:"200000000"});
// instance.getFunderAtIndex(0);
// instance.getAllFunders();

