import React, { Component } from "react";
import BettingPanel from "../components/BettingPanel";
import MyNavbar from "../components/MyNavbar";
import Web3 from "web3";
import Lottery from "../contracts_abi/Lottery.json";
import TruffleContract from "truffle-contract";
import "../css/home-page.css";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value0: null,
      value1: null,
      value2: null,
      value3: null,
      value4: null,
      resultsAvailable: null,
      hasBetterWon: null
    };
    this.bet = this.bet.bind(this);
    this.areBettedNumbersValid = this.areBettedNumbersValid.bind(this);
    this.areResultsAvailable = this.areResultsAvailable.bind(this);
    this.hasBetterWon = this.hasBetterWon.bind(this);
    this.checkResults = this.checkResults.bind(this);
  }

  handleChange(event, componentName) {
    this.setState({ [componentName]: event.target.value });
  }

  areBettedNumbersValid() {
    return (
      this.state.value0 !== null &&
      this.state.value1 !== null &&
      this.state.value2 !== null &&
      this.state.value3 !== null &&
      this.state.value4 !== null &&
      (1 <= this.state.value0 &&
        this.state.value0 <= 49 &&
        1 <= this.state.value1 &&
        this.state.value1 <= 49 &&
        1 <= this.state.value2 &&
        this.state.value2 <= 49 &&
        1 <= this.state.value3 &&
        this.state.value3 <= 49 &&
        1 <= this.state.value4 &&
        this.state.value4 <= 49)
    );
  }

  parseBettedNumbers() {
    let bettedNumbersArray = [
      this.state.value0,
      this.state.value1,
      this.state.value2,
      this.state.value3,
      this.state.value4
    ];
    const sortFunction = (a, b) => a - b;
    bettedNumbersArray.sort(sortFunction);
    return bettedNumbersArray.join(",");
  }

  bet() {
    if (this.areBettedNumbersValid() && window.ethereum) {
      const ethereum = window.ethereum;
      const web3Provider = new Web3(ethereum);

      // Use this only when executing actions (transaction)
      ethereum.enable().then(account => {
        const defaultAccount = account[0];
        web3Provider.eth.defaultAccount = defaultAccount;
        const LotteryContract = TruffleContract(Lottery);
        LotteryContract.setProvider(web3Provider.currentProvider);
        LotteryContract.defaults({ from: web3Provider.eth.defaultAccount });

        LotteryContract.deployed().then(lotteryContract => {
          const price = 100000000000000000;
          const bettingNumbersString = this.parseBettedNumbers();
          lotteryContract.bet(bettingNumbersString, {
            from: defaultAccount,
            value: price
          });
        });
      });
    } else {
      if (!this.areBettedNumbersValid()) {
        console.log("Provided numbers are not valid");
      } else {
        console.log("Provider not available!");
      }
    }
  }

  areResultsAvailable() {
    if (window.ethereum) {
      const ethereum = window.ethereum;
      const web3Provider = new Web3(ethereum);

      // Use this only when executing actions (transaction)
      ethereum.enable().then(account => {
        const defaultAccount = account[0];
        web3Provider.eth.defaultAccount = defaultAccount;
        const LotteryContract = TruffleContract(Lottery);
        LotteryContract.setProvider(web3Provider.currentProvider);
        LotteryContract.defaults({ from: web3Provider.eth.defaultAccount });

        LotteryContract.deployed().then(lotteryContract => {
          // lotteryContract.getWinningNumbers();
          lotteryContract.getWinningNumbers.call().then(result => {
            // console.log(result);
            console.log("winning nums: " + result);
            this.setState({
              ["resultsAvailable"]: result === "" ? false : true
            });
          });
        });
      });
    } else {
      console.log("Provider not available!");
    }
  }

  hasBetterWon() {
    if (window.ethereum) {
      const ethereum = window.ethereum;
      const web3Provider = new Web3(ethereum);

      // Use this only when executing actions (transaction)
      ethereum.enable().then(account => {
        const defaultAccount = account[0];
        web3Provider.eth.defaultAccount = defaultAccount;
        const lotteryContract = TruffleContract(Lottery);
        lotteryContract.setProvider(web3Provider.currentProvider);
        lotteryContract.defaults({ from: web3Provider.eth.defaultAccount });

        lotteryContract.deployed().then(lotteryContract => {
          lotteryContract.getWinners.call().then(result => {
            console.log("current address: " + defaultAccount);
            if (result !== null) {
              for (let i = 0; i < result.length; i++) {
                result[i] = result[i].toLowerCase();
              }
            }
            console.log("winners: " + result);
            this.setState({
              ["hasBetterWon"]:
                result !== null && result.includes(defaultAccount.toLowerCase())
                  ? true
                  : false
            });
          });
        });
      });
    } else {
      console.log("Provider not available!");
    }
  }

  checkResults() {
    this.areResultsAvailable();
    if (this.state.resultsAvailable) {
      this.hasBetterWon();
    }
  }

  checkContractState() {
    if (window.ethereum) {
      const ethereum = window.ethereum;
      const web3Provider = new Web3(ethereum);

      // Use this only when executing actions (transaction)
      ethereum.enable().then(account => {
        const defaultAccount = account[0];
        web3Provider.eth.defaultAccount = defaultAccount;
        const lotteryContract = TruffleContract(Lottery);
        lotteryContract.setProvider(web3Provider.currentProvider);
        lotteryContract.defaults({ from: web3Provider.eth.defaultAccount });

        lotteryContract.deployed().then(lotteryContract => {
          lotteryContract.getState.call().then(result => {
            console.log("state: " + result);
          });
        });
      });
    } else {
      console.log("Provider not available!");
    }
  }

  render() {
    this.checkContractState();
    console.log(this.state);
    return (
      <div className="main">
        <MyNavbar />
        <BettingPanel
          onClickBet={this.bet}
          onClickCheck={this.checkResults}
          areResultsAvailable={this.state.resultsAvailable}
          hasBetterWon={this.state.hasBetterWon}
          handleChange={(event, componentName) =>
            this.handleChange(event, componentName)
          }
          name0="value0"
          name1="value1"
          name2="value2"
          name3="value3"
          name4="value4"
          value0={this.state.value0}
          value1={this.state.value1}
          value2={this.state.value2}
          value3={this.state.value3}
          value4={this.state.value4}
        />
      </div>
    );
  }
}

export default HomePage;
