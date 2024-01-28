import React, { useCallback, useEffect, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import "./App.css";
import { loadContract } from "./utils/load-contract";

function App() {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null,
    isProviderLoaded: false,
  });
  const [balance, setBalance] = useState(null);
  const [account, setAccount] = useState(null);
  const [shouldReload, reload] = useState(false);

  const reloadEffect = useCallback(() => reload(!shouldReload), []);
  const canConnectToContract = account && web3Api.contract;

  const setAccountListener = (provider) => {
    // provider.on("accountsChanged", (accounts) => setAccount(accounts[0]));
    // provider.on("chainChanged", (accounts) => setAccount(accounts[0]));
    provider.on("accountsChanged", (accounts) => window.location.reload());
    provider.on("chainChanged", (accounts) => window.location.reload());

    provider._jsonRpcConnection.events.on("notification", (payload) => {
      const { method } = payload;
      if (method === "metsmask_unlockStateChanged") {
        setAccount(null);
      }
    });
  };
  useEffect(() => {
    const loadProvider = async () => {
      try {
        // With metamask, we have an access to window.ethereum & to window.web3
        // metamask injects a global API into website.
        //  this api allows websites to request users, accounts, read data to blockchain,
        // sign messages and transactions

        const provider = await detectEthereumProvider();

        console.log("provider", provider);

        if (provider) {
          const contract = await loadContract("Faucet", provider);
          console.log("contracts", contract);
          setAccountListener(provider);
          // provider.request({method:"eth_requestAccounts"});
          setWeb3Api({
            web3: new Web3(provider),
            provider,
            contract,
            isProviderLoaded: true,
          });
        } else {
          setWeb3Api((api) => ({ ...api, isProviderLoaded: true }));
          console.error("Install metamask.");
        }

        // if (window.ethereum) {
        //   provider = window.ethereum;
        //   try {
        //     // await provider.enable();
        //     await provider.request({method: "eth_requestAccounts"});
        //   } catch(err) {
        //     console.log("User denied account access!");
        //   }
        // } else if (window.web3) {
        //   provider = window.web3;
        // } else if (!process.env.production) {
        //   provider = new Web3.providers.HttpProvider("http://localhost:7545");
        // }
      } catch (err) {
        console.log("error", err);
      }
    };

    loadProvider();
  }, []);

  useEffect(() => {
    const loadBalance = async () => {
      const { contract, web3 } = web3Api;
      const balance = await web3.eth.getBalance(contract.address);
      setBalance(web3.utils.fromWei(balance, "ether"));
    };

    web3Api.contract && loadBalance();
  }, [web3Api, shouldReload]);

  useEffect(() => {
    const getAccounts = async () => {
      try {
        const accounts = await web3Api.web3.eth.getAccounts();
        setAccount(accounts[0]);
      } catch (err) {
        console.log("getEther Account err", err);
      }
    };

    web3Api.web3 && getAccounts();
  }, [web3Api.web3]);

  const addFunds = useCallback(async () => {
    const { contract, web3 } = web3Api;
    contract.addFunds({
      from: account,
      value: web3.utils.toWei("1", "ether"),
    });
    reloadEffect();
  }, [account, web3Api, reloadEffect]);

  const withdrawFunds = async () => {
    const { contract, web3 } = web3Api;
    const withdrawAmount = web3.utils.toWei("0.1", "ether");
    await contract.withdraw(withdrawAmount, { from: account });
    reloadEffect();
  };

  console.log("web3Api", web3Api);

  return (
    <>
      <div className="faucet-wrapper">
        <div className="faucet">
          {web3Api.isProviderLoaded ? (
            <div className="is-flex is-align-items-center">
              <span>
                <strong className="mr-2">Account: </strong>
              </span>
              {account ? (
                <div>{account}</div>
              ) : !web3Api.provider ? (
                <>
                  <div className="notification is-warning is-size-6 is-rounded">
                    Wallet is not detected!{` `}
                    <a
                      rel="noreferrer"
                      target="_blank"
                      href="https://docs.metamask.io"
                    >
                      Install Metamask
                    </a>
                  </div>
                </>
              ) : (
                <button
                  className="button is-small"
                  onClick={() => {
                    try {
                      web3Api.provider.request({
                        method: "eth_requestAccounts",
                      });
                    } catch (err) {
                      console.log("erer", err);
                    }
                  }}
                >
                  Connect Wallet
                </button>
              )}
            </div>
          ) : (
            <span>Looking for Web3...</span>
          )}
          <div className="balance-view is-size-2 my-4">
            Current Balance: <strong>{balance}</strong> ETH
          </div>
          {!canConnectToContract &&
            <i className="is-block">
              Connect to Ganache
            </i>
          }
          <button
            className="button mr-2"
            onClick={async () => {
              try {
                const accounts = await window.ethereum.request({
                  method: "eth_requestAccounts",
                });
                console.log("accounts", accounts);
              } catch (err) {
                console.log("error", err);
              }
            }}
          >
            Enable Ethereum
          </button>
          <button
            disabled={!account}
            className="button is-link mr-2"
            onClick={addFunds}
          >
            Donate 1 ETH
          </button>
          <button
            disabled={!account}
            className="button is-primary"
            onClick={withdrawFunds}
          >
            Withdraw
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
