import contract from "@truffle/contract";

export const loadContract = async (name, provider) => {
  const res = await fetch(`/contracts/${name}.json`);
  const Artifacts = await res.json();

  const _contract = contract(Artifacts);
  _contract.setProvider();

  let deployedContract = null;
  try {
    deployedContract = await _contract.deployed();
    // return deployedContract
  } catch (err) {
    console.error("err Contract connection error", err);
  }
  return deployedContract;
  // return contract(Artifacts);
};
