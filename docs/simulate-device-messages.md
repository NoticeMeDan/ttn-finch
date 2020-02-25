# How to simulate end device messages for an application

Prerequisites:
* Having [ttn-lw-cli](https://thethingsstack.io/v3.5.3/guides/getting-started/cli/) installed on your machine
* Having your local TTN stack running on your machine

## Setting up ttn-lw-cli
In order to use the ttn-lw-cli with your local TTN stack, you need to configure it.  
To do this, run the `ttn-lw-cli login` command from the project root folder, to authenticate the CLI tool.

## Setting up the gateway
Create a gateway with the following information:
* Gateway ID: `test-gateway`
* Frequency Plan: `Europe 863-870 MHz (TTN)`

The rest does not matter, fill out as you see fit.

## Setting up the application
Create an application. The information you use does not matter, fill out as you see fit.

## Setting up the device
Create a new Device for your application with the following information:
* MAC Version: `MAC V1.1`
* PHY Version: `PHY V1.0.1`
* Frequency Plan: `Europe 863-870 MHz (TTN)`
* Activation Mode: `Activation By Personalization (ABP)`
* Device Address: `0192EFE9`
* NwkSKey: `A1B02BD98BBB6175B7EE0901639002E3`
* SNwkSIntKey: `739C5B160C869248F139B364BF1E9F7B`
* NwkSEncKey: `9619B7B3E16F72910D916623296D2EFA`
* AppSKey: `E6A4F29F557A8A1F73BF763931D62433`
* Resets Frame Counters: Enabled

The rest does not matter, fill out as you see fit.

## Simulating messages
Now you can run the `simulate.sh` script in the root of the project.  
It will simulate a message every 30 seconds until you cancel it.