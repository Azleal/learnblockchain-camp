// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contract/utils/Counters.sol";


contract UpchainCampIIMembershipNFT is IERC721, Ownable{
  
  using Counters for Counters.counter;
  
  Counters.counter private _id;

  string private _name;
  string private _symbol;

  mapping(uint256 => address) private _owners;
  mapping(address => uint256) private _balances;


  constructor(string memory name_, string memory symbol_ ) Ownable() {
      _name = name_;
      _symbol = symbol_;
  }

    function balanceOf(address owner) external view returns (uint256 balance){
      
    }


    function ownerOf(uint256 tokenId) external view returns (address owner);

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes calldata data
    ) external;


    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;

    function approve(address to, uint256 tokenId) external;


    function setApprovalForAll(address operator, bool _approved) external;


    function getApproved(uint256 tokenId) external view returns (address operator);

    function isApprovedForAll(address owner, address operator) external view returns (bool);

}
