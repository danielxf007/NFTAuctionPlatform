// SPDX-License-Identifier: None
pragma solidity ^0.8.0;

contract NFTAuctionSell{
    address platform_wallet;

    constructor(address platform){
        platform_wallet = platform;
    }
    
    /**
     * @dev 
     * 
     */
    function completeAuction() public view{
        require(msg.sender == platform_wallet, "This is not the platform's wallet");
    }
}