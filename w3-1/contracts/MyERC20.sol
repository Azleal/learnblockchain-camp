// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyERC20 is IERC20, Ownable {
    // owner => (spender => amount)
    mapping(address => mapping(address => uint256)) private _allowances;
    mapping(address => uint256) private _balances;
    uint256 private _totalSupply;
    uint256 constant private _decimal = 18;
    string private _symbol;
    string private _name;
    // eth买入的比率
    uint256 public ETH_BUY_IN_RATIO = 100;

    constructor(string memory name_, string memory symbol_) Ownable() {
        _symbol = symbol_;
        _name = name_;
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

    function transfer(address to, uint256 amount) external returns (bool) {
      _transfer(msg.sender, to, amount);
      return true;
    }

    function allowance(
        address owner,
        address spender
    ) external view returns (uint256) {
        return _allowances[owner][spender];
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        _allowances[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    error InsufficientAllowanceCredit();

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool){
        //检查allowance
        uint256 _allowance = _allowances[from][msg.sender];
        if(_allowance < amount){
          revert InsufficientAllowanceCredit();
        }
        _allowances[from][msg.sender] -= amount;
        _transfer(from, to, amount);
        return true;
    }

    error InsufficientBalance();

    function _transfer(address from, address to, uint256 amount) private{
        uint256 fromBalance = _balances[from];
        if(fromBalance < amount){
          revert InsufficientBalance();
        }
        _balances[from] -= amount;
        _balances[to] += amount;
        emit Transfer(from, to, amount);
    }

    function _mint(address account, uint256 amount) private {
      _totalSupply += amount;
      _balances[account] += amount;
      emit Transfer(address(0), account, amount);
    }

    //////////////////////////

    // 金额不足
    error InsufficientValueProvided();

    function buy() external payable {
      uint256 value = msg.value;
      if(value <= 0){
        revert InsufficientValueProvided();
      }
      uint256 amount = ETH_BUY_IN_RATIO * value;
      _mint(msg.sender, amount);
    }

    function setBuyInRatio(uint256 ratio_) external onlyOwner {
        ETH_BUY_IN_RATIO = ratio_;
    }

    error WithdrawError();
    function withdraw() external onlyOwner {
      uint256 ethBalance = address(this).balance - 1;
      (bool success,) = msg.sender.call{value: ethBalance}("");
      if(!success){
        revert WithdrawError();
      }
    } 
    fallback(bytes calldata data) external payable returns (bytes memory){}

    receive() external payable{}
}


contract Vault{
  
  error InsufficientBalance();

  IERC20 public _token;

  mapping(address => uint256) private _balances;
  
  constructor(address token_) {
    _token = IERC20(token_);
  }


  function deposit(uint256 amount) external {
    _token.transferFrom(msg.sender, address(this), amount);
  }

  function widthdraw(uint256 amount) external {
    _withdraw(msg.sender, amount);
  }

  function widthdrawAll() external {
    uint256 amount = _balances[msg.sender];
    _withdraw(msg.sender, amount);
  }

  function _withdraw(address account, uint256 amount) private{
    uint256 accountBalance = _balances[account];
    if(accountBalance <  amount){
        revert InsufficientBalance();
    }
    _balances[account] -= amount;
    _token.transfer(account, amount);
  }

  function balanceOf(address account) external view returns(uint256) {
    return _balances[account];
  }

}