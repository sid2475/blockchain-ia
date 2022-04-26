var Lottery = artifacts.require('Lottery');

module.exports = function(deployer) {
    deployer.deploy(Lottery);
    // Additional contracts can be deployed here
};