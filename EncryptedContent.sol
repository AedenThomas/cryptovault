// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EncryptedContent {
    mapping(string => string) private contentHashes;

    function storeContentHash(string memory identifier, string memory contentHash) public {
        contentHashes[identifier] = contentHash;
    }

    function getContentHash(string memory identifier) public view returns (string memory) {
        return contentHashes[identifier];
    }
}