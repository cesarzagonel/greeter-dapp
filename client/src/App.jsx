import Web3 from "web3";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import "./App.css";

function App() {
  const [newGreeting, setNewGreeting] = useState("");
  const client = useQueryClient();

  const { data } = useQuery("contract", async () => {
    const web3 = new Web3(Web3.givenProvider);
    const accounts = await web3.eth.requestAccounts();
    const networkID = await web3.eth.net.getId();

    const artifact = require("./Greeter.json");
    const { abi } = artifact;
    const address = artifact.networks[networkID].address;
    const contract = new web3.eth.Contract(abi, address);

    return { contract, accounts };
  });

  const { data: greeting } = useQuery(
    "greeting",
    async () => {
      return await data.contract.methods
        .greet()
        .call({ from: data.accounts[0] });
    },
    {
      enabled: !!data,
    }
  );

  const setGreeting = async () => {
    await data.contract.methods
      .setGreeting(newGreeting)
      .send({ from: data.accounts[0] });

    setNewGreeting("");
    client.invalidateQueries("greeting");
  };

  return (
    <div className="greeter">
      <h1>{greeting}</h1>
      <br />
      <input
        type="text"
        value={newGreeting}
        onChange={(e) => setNewGreeting(e.target.value)}
      />
      <button onClick={setGreeting}>save</button>
    </div>
  );
}

export default App;
