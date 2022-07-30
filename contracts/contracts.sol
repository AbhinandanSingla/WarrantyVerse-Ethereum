pragma solidity ^0.8.1;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Admin is Ownable {
    address[] private sellerList;

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
        string imageHash;
    }

    mapping(address => NftData[])private sellerNfts;
    function mintWarrantyNFT(address recipient, string memory tokenURI,uint expireDate,string memory image)
    public validateSeller(msg.sender) returns (uint)
    {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        sellerNfts[recipient].push(NftData(newItemId,expireDate,msg.sender,block.timestamp,image));
        return newItemId;
    }

    function getAllUserNfts(address user)
    public view returns (NftData[] memory) {
        return sellerNfts[user];
    }

    function validateNFT(address user,uint _token)validateSeller(msg.sender)
    public view returns(bool){
        for (uint i=0;i<sellerNfts[user].length;i++){
            if(sellerNfts[user][i].id == _token){
                return true;
            }
        }
        return false;
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: caller is not token owner nor approved");
        for (uint i=0;i<sellerNfts[from].length;i++){
            if(sellerNfts[from][i].id == tokenId){
                sellerNfts[to].push(sellerNfts[from][i]);
                sellerNfts[from][i]=sellerNfts[from][sellerNfts[from].length-1];
                sellerNfts[from].pop();
            }
        }
        _transfer(from, to, tokenId);
    }
    function burnWarranty(address user,uint token) public onlyOwner{
        for(uint i = 0;i<sellerNfts[user].length;i++){
            if(sellerNfts[user][i].id==token){
                if(sellerNfts[user][i].expireDate>block.timestamp){
                    _burn(token);
                }
                break;
            }
        }
        for(uint j = 0;j<sellerNfts[user].length;j++){
            if(sellerNfts[user][j].id==token){
                sellerNfts[user][j] = sellerNfts[user][sellerNfts[user].length-1];
                sellerNfts[user].pop();
                break;
            }
        }
    }
}















