# SimpleStorage Smart Contract Challenge

This project demonstrates a Solidity smart contract with event emission capabilities and comprehensive testing using Hardhat.

##  Overview

The `SimpleStorage` contract is an enhanced version of a basic storage contract that allows users to:
- Store and retrieve a favorite number
- Map names to favorite numbers
- Emit events when storage operations occur

##  Key Enhancement: NumberStored Event

### Purpose of the Event

The `NumberStored` event was added to provide **transparency and traceability** for storage operations. Events in Solidity serve several critical purposes:

1. **Off-chain Monitoring**: Allows external applications (dApps, indexers, analytics tools) to listen for and react to storage updates in real-time.

2. **Gas Efficiency**: Events are significantly cheaper than storing data on-chain, making them ideal for logging historical data that doesn't need to be queried by smart contracts.

3. **Audit Trail**: Creates an immutable record of all storage operations, which is essential for debugging, compliance, and user interfaces that need to display activity history.

4. **User Experience**: Enables wallets and front-end applications to provide immediate feedback to users when their transactions successfully update the stored value.

### Implementation

```solidity
event NumberStored(uint256 newNumber);

function store(uint256 _favoriteNumber) public {
    favoriteNumber = _favoriteNumber;
    emit NumberStored(_favoriteNumber);
}
```

The event is emitted every time the `store` function is called, capturing the new value being stored.

##  Test Suite Explanation

The test suite (`test/SimpleStorage.test.js`) uses Hardhat's testing framework with Chai assertions and Ethers.js. Here's how the tests work:

### Test Structure

1. **Setup (beforeEach)**
   - Before each test, a fresh instance of the SimpleStorage contract is deployed
   - This ensures test isolation—each test runs against a clean state
   - Uses `ethers.getContractFactory()` to get the contract and `deploy()` to deploy it to a local Hardhat network

### Test Categories

#### 1. Store and Retrieve Tests
```javascript
it("Should store and retrieve a number correctly", async function () {
  await simpleStorage.store(42);
  const retrievedNumber = await simpleStorage.retrieve();
  expect(retrievedNumber).to.equal(42);
});
```
- **What it tests**: Verifies that numbers stored via `store()` can be correctly retrieved via `retrieve()`
- **Why it matters**: This is the core functionality—ensuring data persistence works correctly

#### 2. Event Emission Tests
```javascript
it("Should emit NumberStored event with correct value when store is called", async function () {
  await expect(simpleStorage.store(777))
    .to.emit(simpleStorage, "NumberStored")
    .withArgs(777);
});
```
- **What it tests**: Confirms that the `NumberStored` event is emitted with the correct value
- **How it works**: Uses Chai's `.to.emit()` matcher to verify event emission and `.withArgs()` to verify the emitted value
- **Why it matters**: Ensures external applications can reliably track storage operations

### Running the Tests

The test framework:
1. Spins up a local Ethereum network (Hardhat Network)
2. Compiles the Solidity contract
3. Deploys the contract to the test network
4. Executes each test in isolation
5. Reports results with detailed feedback

##  Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Compile the smart contract
npx hardhat compile

# Run the test suite
npx hardhat test
```

### Expected Test Output

```
SimpleStorage
  store and retrieve
    ✓ Should store and retrieve a number correctly
    ✓ Should update the stored number when store is called multiple times
  NumberStored event
    ✓ Should emit NumberStored event with correct value when store is called
    ✓ Should emit NumberStored event with updated value on subsequent calls
  addPerson
    ✓ Should map a name to a favorite number

5 passing
```

##  Bug Fix

The original contract contained a typo in the `store` function:
```solidity
//  Original (incorrect)
favoriteNumber = _favorite_number;

//  Fixed
favoriteNumber = _favoriteNumber;
```

The variable name used an underscore instead of camelCase, which would have caused a compilation error.

##  Technology Stack

- **Solidity ^0.8.20**: Smart contract language
- **Hardhat**: Ethereum development environment
- **Ethers.js**: Library for interacting with Ethereum
- **Chai**: Assertion library for testing
- **Mocha**: Test framework

##  License

This project is licensed under the MIT License.

##  Challenge Completion

This repository successfully completes all challenge requirements:

 Added `NumberStored` event to the `store` function  
 Created comprehensive tests verifying:
  - The `retrieve` function returns the stored number
  - The `NumberStored` event is emitted with correct values  
 Provided detailed explanation of the event and testing methodology

---

*Created as a Smart Contract Fundamentals Challenge submission*
