// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract Factory {
    address[] public deploy;

    function buy (
        string calldata name,
        string calldata image,
        uint256  value,
        address account,
        string calldata buyer,
        string calldata seller
    ) public payable{
        require(msg.value==value, "sent full payment");
        address newCampaign = address(new FundRaiser(
            name,
            image,
            value,
            account,
            buyer,
            seller
        ));
        payable(account).transfer(address(this).balance);
        deploy.push(newCampaign);
    }

    function get() public view returns (address) {
        return deploy[deploy.length - 1];
    }
}

contract FundRaiser {
    string public name;
    string public image;
    string public buyer;
    string public seller;
    uint256 public value;
    address public account;

    constructor(
        string memory n,
        string memory i,
        uint256 v,
        address a,
        string memory b,
        string memory s
    )  {
        name = n;
        image = i;
        buyer = b;
        seller = s;
        value = v;
        account=a;
    }

    function getSummary()
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            uint256,
            address
        )
    {
        return (name, image, buyer, seller, value,account);
    }
}
