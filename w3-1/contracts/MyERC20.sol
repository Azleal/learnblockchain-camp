// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyERC20 is IERC20, Ownable {
    // owner => (spender => amount)
    mapping(address => mapping(address => uint256)) private _allowances;
    mapping(address => uint256) private _balances;
    uint256 private _totalSupply;
    uint256 private _decimal;
    string private _symbol;
    // eth买入的比率
    uint256 public ETH_BUY_IN_RATIO = 1;

    constructor(string memory symbol_, uint256 decimal_) Ownable() {
        _symbol = symbol_;
        _decimal = decimal_;
    }

    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256) {
        return _totalSupply;
    }

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256) {
        return _balances[account];
    }

    function transfer(address to, uint256 amount) external returns (bool) {}

    function allowance(
        address owner,
        address spender
    ) external view returns (uint256) {
        return _allowances[owner][spender];
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        _allowances[msg.sender][spender] = amount;
        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);

    //

    // 金额不足
    error InsufficientValueProvided();

    function buy() external payable {
      if(msg.value <= 0){
        revert InsufficientValueProvided();
      }


    }

    function setBuyInRatio(uint256 ratio_) external onlyOwner {
        ETH_BUY_IN_RATIO = ratio_;
    }
}
