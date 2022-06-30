const Crowdfunding = artifacts.require("Crowdfunding");

module.exports = function (deployer) {
  deployer.deploy(Crowdfunding);
};
