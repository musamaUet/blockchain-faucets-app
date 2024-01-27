import React from 'react';

function App() {

  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null
  });
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const loadProvider = async () => {
      // With metamask, we have an access to window.ethereum & to window.web3
      // metamask injects a global API into website.
      //  this api allows websites to request users, accounts, read data to blockchain,
      // sign messages and transactions

      const provider = await detectEthereumProvider();
      if(provider) {
        // provider.request({method:"eth_requestAccounts"});
        setWeb3Api({web3: new Web3(provider), provider});
      } else {
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
    }

    loadProvider();
  }, [])

  useEffect(() => {
    const getAccounts = async () => {
      const accounts = await web3Api.web3.eth.getAccounts();
      setAccount(accounts[0]);
    }

    web3Api.web3 && getAccounts();
  }, [web3Api.web3])

  console.log('web3Api', web3Api);

  return (
    <div>
      Faucet web app
    </div>
  );
}

export default App;
