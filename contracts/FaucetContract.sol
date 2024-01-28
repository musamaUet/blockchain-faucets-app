// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./Owned.sol";
import "./Logger.sol";
import "./IFaucet.sol";

contract Faucet is Owned, Logger, IFaucet {
 
    uint public numOfFunders;

    mapping(address => bool) private funders;
    mapping(uint => address) private lutFunders;
    receive() external payable {}

    function emitLog() public override pure returns(bytes32) {
        return "Hello World";
    }

    function transferOwnership(address newOwner) external onlyOwner {
        owner = newOwner;
    }

    modifier limitWithdraw(uint withdrawAmount) {
        require(withdrawAmount <= 1000000000000000000, "Cannot withdraw more than 1 ether");
        // This underscore means that if above exception will not occur, then function body will be executed.
        _;
    }

    function addFunds() override external payable {
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

    function test1() external onlyOwner {
        // some managing stuff that only admin should have access to. 
    }

    function test2() external onlyOwner {
        // some managing stuff that only admin should have access to.
    }

    function withdraw(uint withdrawAmount) external limitWithdraw(withdrawAmount) {
        // if our amount is less than 1 ETH
        // if (withdrawAmount < 1000000000000000000) {
        //     payable(msg.sender).transfer(withdrawAmount);
        // }
        // require(withdrawAmount <= 1000000000000000000, "Cannot withdraw more than 1 ether");
        payable(msg.sender).transfer(withdrawAmount);
    }

    function getFunderAtIndex(uint8 index) external view returns(address) {
        return lutFunders[index];
    }
}

// Block Info
// Nonce - a hash that when combined with the minHash proofs that the block has gone through proof of work(POW).
// 8 Bytes => 64 Bits


// truffle console
// const instance = await Faucet.deployed();
// instance.addFunds({from: accounts[0], value:"200000000"});
// instance.getFunderAtIndex(0);
// instance.getAllFunders();

// instance.withdraw("500000000000000000", {from: accounts[0]})

