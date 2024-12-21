// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EducationalToken {
    string public name = "Educational Token";
    string public symbol = "EDU";
    uint8 public decimals = 18;
    uint256 public totalSupply = 1000000 * 10**18; // 1 million tokens

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(string => bool)) public hasWatchedVideo;
    mapping(string => uint256) public videoRewards;
    address public owner;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event VideoWatched(address indexed user, string videoId, uint256 reward);

    constructor() {
        owner = msg.sender;
        balanceOf[msg.sender] = totalSupply;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    function setVideoReward(string memory videoId, uint256 reward) public onlyOwner {
        videoRewards[videoId] = reward;
    }

    function watchVideo(string memory videoId) public {
        require(videoRewards[videoId] > 0, "Video not registered");
        require(!hasWatchedVideo[msg.sender][videoId], "Already watched this video");
        require(balanceOf[owner] >= videoRewards[videoId], "Insufficient reward tokens");

        uint256 reward = videoRewards[videoId];
        hasWatchedVideo[msg.sender][videoId] = true;
        
        balanceOf[owner] -= reward;
        balanceOf[msg.sender] += reward;

        emit VideoWatched(msg.sender, videoId, reward);
        emit Transfer(owner, msg.sender, reward);
    }

    function transfer(address to, uint256 value) public returns (bool success) {
        require(balanceOf[msg.sender] >= value, "Insufficient balance");
        require(to != address(0), "Invalid address");

        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;

        emit Transfer(msg.sender, to, value);
        return true;
    }
}