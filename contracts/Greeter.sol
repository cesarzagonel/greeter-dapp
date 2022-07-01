// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Greeter {
    string private _greeting = "Hello World!";

    function setGreeting(string calldata greeting) external {
        _greeting = greeting;
    }

    function greet() external view returns(string memory) {
        return _greeting;
    }
}
