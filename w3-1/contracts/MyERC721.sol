// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol"
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contract/utils/Counters.sol";
import "./MyERC20.sol";


contract UpchainCampIIMembershipNFT is IERC721, Ownable, ERC165, IERC721Metadata{
  
  using Counters for Counters.counter;
  
  Counters.counter private _id;

  string private _name;
  string private _symbol;

  mapping(uint256 => address) private _owners;
  mapping(address => uint256) private _balances;

  string constant public _BASE_URI = "ipfs://";

  // 可以用来购买当前nft的token
  MyERC20 public _token;

  mapping (uint256 => string) private _tokenUri;

  mapping (address => mapping(address => bool)) private _approveForAll;
  mapping (uint256 => address) private _approvals;


  //nft的单价
  uint256 public PRICE_IN_ETH = 0.01 ether;


  constructor(string memory name_, string memory symbol_, address token_ ) Ownable() {
      _name = name_;
      _symbol = symbol_;
      _token = MyERC20(token_);
  }

    function balanceOf(address owner) external view returns (uint256){
      return _balances[owner];
    }


    function ownerOf(uint256 tokenId) external view returns (address){
      return _ownerOf(tokenId);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes calldata data
    ) external{
      require(from != address(0), "from cannot be zero address");
      require(to != address(0), "to cannot be zero address");
      require(_ownerOf(tokenId) == from, "from is not owner of tokenId");
      if( ){

      }
    }


    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external{

    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external{
      require();
      _transfer
    }

    function approve(address to, uint256 tokenId) external{
      require(_owners[tokenId] == msg.sender, "not your token");
      _approvals[tokenId] = to;
    }


    function setApprovalForAll(address operator, bool _approved) external{
      _approveForAll[msg.sender][operator] = _approved;
    }


    function getApproved(uint256 tokenId) external view returns (address operator){
      return _approvals[tokenId];
    }

    function isApprovedForAll(address owner, address operator) external view returns (bool){
      return _approveForAll[owner][operator];

    }

  function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(tokenId < _id.current(), "token is not minted yet"  );
        string memory baseURI = _BASE_URI;
        string memory tokenIdUri = _tokenUri[tokenId];
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString())) : "";
    }

///////private
    function _transfer(address from, address to, uint256 tokenId, bytes memory data) private {

      require(_owners[tokenId] == from, "not token owner");
      require(to ==address(0), "transfer to zero address");
      
      delete _approvals[tokenId];
      _balances[from] -= 1;
      _balances[to] += 1;

      _owners[tokenId] = to;
      emit Transfer(from, to, tokenId, 1);
    }

    function _ownerOf(uint256 tokenId) private returns(address){
      require(tokenId < _id, "tokenId不存在");
      return _owners[tokenId];
    }

    function _mint(address to) private {
      uint256 tokenId = _id.current();
      _id.increment();
      _balances[to] += 1;
      _owners[tokenId] = to;

    }

  ///////////////////
  function mint() external payable{
    require(msg.value >= PRICE_IN_ETH, "value under price");
    _mint(msg.sender);
  }

  function mintWithToken() external {
      uint256 priceInToken = PRICE_IN_ETH * _token.ETH_BUY_IN_RATIO;
      bool success = _token.transferFrom(msg.sender, address(this), priceInToken);
      require(success, "token transfer failed");
      _mint(msg.sender);
  }

///////////////////


}

contract NFTBuyer is Ownable{

}
