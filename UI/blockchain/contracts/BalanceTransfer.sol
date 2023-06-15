// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract BalanceTransfer {
    mapping(address => uint256) private balances;

    event BalanceAdded(address indexed from, address indexed to, uint256 amount);
    event BalanceWithdrawn(address indexed from, uint256 amount);

    function getBalance(address _address) public view returns(uint256) {
        return balances[_address];
    }

    function addBalance(address _to) public payable {
        require(msg.value > 0, "Amount should be greater than 0");
        balances[_to] += msg.value;
        emit BalanceAdded(msg.sender, _to, msg.value);
    }

    function withdrawBalance() public {
        uint256 balance = balances[msg.sender];
        require(balance > 0, "Balance should be greater than 0");
        balances[msg.sender] = 0;
        payable(msg.sender).transfer(balance);
        emit BalanceWithdrawn(msg.sender, balance);
    }
}