// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleStorage {
    uint256 private favoriteNumber;
    mapping(string => uint256) public nameToFavoriteNumber;

    // Event emitted whenever a new number is stored
    event NumberStored(uint256 newNumber);

    function store(uint256 _favoriteNumber) public {
        favoriteNumber = _favoriteNumber;
        emit NumberStored(_favoriteNumber);
    }

    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }

    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        nameToFavoriteNumber[_name] = _favoriteNumber;
    }
}

