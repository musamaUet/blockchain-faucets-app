// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Storage {
    uint8 public a = 7;     // 1 Byte
    uint16 public b = 10;   // 1 Byte
    address public c = 0x4E702f6FEC4E9a8c2cdb730346fb96dF8fce1C31;  // 20 Byte
    bool d = true;          // 1 Byte
    uint64 e = 15;          // 8 Byte
    uint256 public f = 200; // 32 Byte
    uint8 public g = 40;    // 1 Byte
    uint256 public h = 789; // 32 Byte
}