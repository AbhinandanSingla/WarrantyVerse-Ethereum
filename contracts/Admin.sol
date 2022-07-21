//SPDX-License-Identifier: UNLICENSED
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