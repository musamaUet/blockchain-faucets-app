// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Storage {
    mapping(uint => uint) public aa;
    mapping(address => uint) public bb;
    uint[] public cc;
    uint8 public a = 7;     // 1 Byte
    uint16 public b = 10;   // 1 Byte
    address public c = 0x4E702f6FEC4E9a8c2cdb730346fb96dF8fce1C31;  // 20 Byte
    bool d = true;          // 1 Byte
    uint64 e = 15;          // 8 Byte
    uint256 public f = 200; // 32 Byte
    uint8 public g = 40;    // 1 Byte
    uint256 public h = 789; // 32 Byte

    constructor() {
        aa[2] = 4;
        aa[3] = 10;

        bb[0xcAe1a86c6DA0ED70d45Ca25F4195F5f31Cbae76e] = 100;

    }
}