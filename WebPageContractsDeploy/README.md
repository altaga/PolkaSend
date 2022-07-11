# PolkaSend  Contract Deploy Tool

<img src="https://i.ibb.co/gVgpQ9X/logo-Polka.png">

The PolkaSend team cares a lot about generating useful tools for developers and being able to develop in any EVM, so we made the following tool to be able to deploy smart contracts on the Acala EVM+ blockchain correctly.

**IF YOU'RE A JUDGE YOU CAN TEST OUR APPLICATION HERE:**

WEBAPP: https://polka-send-contract-deploy-tool.vercel.app/
Source Code: https://github.com/altaga/PolkaSend/tree/main/WebPageContractsDeploy

# Introduction and Problem

As you well know if you are a developer on Acala EVM+, the deployment of smart contracts on this blockchain requires a series of parameters and configurations in order to function correctly.

# Prerequisites:

- Have an activated developer account.
  - https://evmdocs.acala.network/tooling/development-account
- Read the documentation on gas consumption in Acala EVM+ transactions
  - https://evmdocs.acala.network/network/gas-parameters
- Read the basic documentation on how to use the RemixIDE.
  - https://evmdocs.acala.network/tooling/remix-ide

# How it works:

- Open our tool from this URL:
  - https://polka-send-contract-deploy-tool.vercel.app/

<img src="https://i.ibb.co/T1Bkzmz/1.png">

- Press the button to connect with your metamask wallet. (You should have previously configured Mandala TC7)

<img src="https://i.ibb.co/SxRgqjr/2.png">

- Accept the connection with the webpage.

<img src="https://i.ibb.co/VJB495X/3.png">

- We will obtain some important data for the correct deployment of the contract.
   - You must have a minimum balance to be able to deploy the contract, the page will notify you if you have the minimum ACA for it, also if you do not have the minimum balance the page will not let you attempt the deployment (since it will cost you even if it fails).

<img src="https://i.ibb.co/M6TW6XC/4.png">

- If you have enough ACA to be able to deploy, we will have 2 options to either paste our own bytecode from the Remix IDE or deploy one of the precompiled contracts provided by Acala.
   - More details of these contracts here: https://github.com/AcalaNetwork/predeploy-contracts

<img src="https://i.ibb.co/whW6RBX/5.png">

- In this case we will show the deployment of a contract created in Remix IDE. We only have to copy the Bytecode that it gives us.

<img src="https://i.ibb.co/nmsjj0q/6.png">

- We will paste it in the Raw Remix Bytecode section and press the Upload Bytecode button (if you did everything right the input memories will turn green and a Bytecode Ready sign will be displayed).

<img src="https://i.ibb.co/bLtJhfZ/7.png">

- We will press the Upload Contract button, which will open the metamask with the transaction that we are going to carry out but STOP, we have to modify the gas parameters so that the transaction is done correctly.

<img src="https://i.ibb.co/y0YQ3TT/8.png">

- We will press on edit and the next section will open, there we will press Edit suggested gas fee.

<img src="https://i.ibb.co/zP5zBDJ/9.png">

- In this section we will put the parameters indicated by the web app and we will press save.

<img src="https://i.ibb.co/3vmTW4R/10.png">

- Now if we can confirm our contract.

<img src="https://i.ibb.co/s6QMG7m/11.png">

- If everything went well, a comical YAY will sound, confetti will appear and the Contract Address, write down the address of the contract since the Blockscout explorer may take time to see it again.

<img src="https://i.ibb.co/5jQw2Kn/12.png">

- Now with that address you can review your contract in Remix, you will notice that it will work perfectly.

<img src="https://i.ibb.co/J2tpzLN/13.png">
<img src="https://i.ibb.co/4F1rTgc/14.png">
