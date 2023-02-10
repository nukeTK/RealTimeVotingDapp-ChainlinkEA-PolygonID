// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./lib/GenesisUtils.sol";
import "./interfaces/ICircuitValidator.sol";
import "./verifiers/ZKPVerifier.sol";

contract AgeVerification is ZKPVerifier {
    uint64 public constant TRANSFER_REQUEST_ID = 1;
    
    mapping(uint256 => address) public checkID;
    mapping(address => uint256) public checkAddress;

    function _beforeProofSubmit(
        uint64, /* requestId */
        uint256[] memory inputs,
        ICircuitValidator validator
    ) internal view override {
        // check that challenge input of the proof is equal to the msg.sender
        address addr = GenesisUtils.int256ToAddress(
            inputs[validator.getChallengeInputIndex()]
        );
        require(
            _msgSender() == addr,
            "address in proof is not a sender address"
        );
    }

    function _afterProofSubmit(
        uint64 requestId,
        uint256[] memory inputs,
        ICircuitValidator validator
    ) internal override {
        require(
            requestId == TRANSFER_REQUEST_ID && checkAddress[_msgSender()] == 0,
            "proof can not be submitted more than once"
        );

        uint256 id = inputs[validator.getChallengeInputIndex()];
        // Execute function for voting
        if (checkID[id] == address(0)) {
            checkAddress[_msgSender()] = id;
            checkID[id] = _msgSender();
        }
    }
}
