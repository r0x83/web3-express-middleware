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

    function resolve(bytes calldata ipfs_hash) public returns (bytes32) {
        bytes memory url = "localhost:5001/api/v0/cat?arg="; 
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        request.add("get", url + ipfs_hash);
        bytes32 request_id = sendChainlinkRequestTo(oracle, request, fee);
        idHash[request_id] = ipfs_hash;
        return request_id;
    }

    function fulfill(bytes32 _requestId, string calldata _md5hash) public recordChainlinkFulfillment(_requestId) {
        idHash[_requestId] = _md5hash;
    }

    function resolveCallback(bytes32 _requestId, string calldata _md5) public returns (bool verified){
        // should add check to see if the request is completed/pending/errored out
        return idHash[_requestId] == _md5;
    }
}