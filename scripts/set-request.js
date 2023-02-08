const main = async () => {
    const circuitId = "credentialAtomicQuerySig";
    const validatorAddress = "0xb1e86C4c687B85520eF4fd2a0d14e81970a15aFB"; //Alread deployed Contract on polygon mumbai testnet
  
    const schemaHash = "PID"; // extracted from PID Platform
  
    const schemaEnd = fromLittleEndian(hexToBytes(schemaHash));
  
    
    const query = {
      schema: ethers.BigNumber.from(schemaEnd),
      slotIndex: 2, 
      operator: 2,
      value: [20020101, ...new Array(63).fill(0).map((i) => 0)],
      circuitId,
    };
  
    // add the address of the contract of AgeVerification
    AgeVerificationAddress = "ADDRESS";
  
    //calling contract with the address
    let AgeVerificationContract = await hre.ethers.getContractAt(
      "AgeVerification",
      AgeVerificationAddress
    );
    
    //Here you will put the request to the contract 
    try {
      const tx = await AgeVerificationContract.setZKPRequest(1, validatorAddress, query);
      tx.wait();
  
      console.log(
        `Request set at:\nNOTE: May take a little bit to show up\nhttps://mumbai.polygonscan.com/tx/${tx.hash}`
      );
    } catch (e) {
      console.log("error: ", e);
    }
  };
  
  function hexToBytes(hex) {
    for (var bytes = [], c = 0; c < hex.length; c += 2)
      bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
  }
  
  function fromLittleEndian(bytes) {
    const n256 = BigInt(256);
    let result = BigInt(0);
    let base = BigInt(1);
    bytes.forEach((byte) => {
      result += base * BigInt(byte);
      base = base * n256;
    });
    return result;
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });