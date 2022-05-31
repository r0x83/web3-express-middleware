// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract web3Api is ChainlinkClient {
    using Chainlink for Chainlink.Request;

    mapping(bytes32 => string) public idHash;

    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    constructor(){
        // sets the stored address for the LINK token based on the 
        // public network that the contract is deployed on
        setPublicChainlinkToken();

        //ROPSTEN oracle 
        oracle = 0xB36d3709e22F7c708348E225b20b13eA546E6D9c; 
        jobId = "de6ad2f87c6b42679777dc658a93705c";
        fee = 100000000000000000; //0.1 LINK Token
    }

    //BASIC REQUEST MODEL

    //function that requests to the chainlink oracle
    function resolve(bytes calldata ipfs_hash) public returns (bytes32) {
        bytes memory url = "localhost:5001/api/v0/cat?arg="; 
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        request.add("get", string(abi.encodePacked(url, ipfs_hash)));
        bytes32 request_id = sendChainlinkRequestTo(oracle, request, fee);
        idHash[request_id] = string(ipfs_hash);
        return request_id;
    }

    //function that gets called by oracle to send data back
    function fulfill(bytes32 _requestId, string calldata _md5hash) public recordChainlinkFulfillment(_requestId) {
        idHash[_requestId] = _md5hash;
    }

    //callback function for verifying
    function resolveCallback(bytes32 _requestId, string calldata _md5) public view returns (bool verified){
        return keccak256(bytes(idHash[_requestId])) == keccak256(bytes(_md5));
    }
}