pragma solidity ^0.8.1;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Counters.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Admin is Ownable {
    address[] private sellerList;

    event fuckMsg(string msg);

    function checkSeller(address _sellerID) private view returns (bool){
        bool seller = false;
        for (uint i = 0; i < sellerList.length; i++) {
            if (sellerList[i] == _sellerID) {
                seller = true;
            }
        }
        return seller;
    }

    function addSeller(address _sellerID) public onlyOwner {
        require(!checkSeller(_sellerID), "Seller is already in Seller List");
        sellerList.push(_sellerID);
    }

    modifier validateSeller(address _sellerID){
        bool seller = false;
        for (uint i = 0; i < sellerList.length; i++) {
            if (sellerList[i] == _sellerID) {
                seller = true;
            }
        }
        require(seller, "Seller is not Authorized Seller");
        _;
    }

}

contract Seller is Ownable, Admin, ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("WarrantyVerse", "wVs") {}
    struct NftData {
        uint256 id;
        uint expireDate;
        address seller;
        uint generatedDate;
    }

    mapping(address => NftData[])private sellerNfts;

    function mintWarrantyNFT(address recipient, string memory tokenURI,uint expireDate)
    public validateSeller(msg.sender) returns (uint)
    {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        sellerNfts[recipient].push(NftData(newItemId,expireDate,msg.sender,block.timestamp));
        return newItemId;
    }

    function getAllUserNfts(address user) validateSeller(msg.sender)
    public view returns (NftData[] memory) {
        return sellerNfts[user];
    }

}








