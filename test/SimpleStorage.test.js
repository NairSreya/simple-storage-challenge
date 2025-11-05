const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleStorage", function () {
  let simpleStorage;
  let owner;

  beforeEach(async function () {
    // Deploy the contract before each test
    [owner] = await ethers.getSigners();
    const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await SimpleStorage.deploy();
    await simpleStorage.waitForDeployment();
  });

  describe("store and retrieve", function () {
    it("Should store and retrieve a number correctly", async function () {
      const numberToStore = 42;

      // Store the number
      await simpleStorage.store(numberToStore);

      // Retrieve and verify the number
      const retrievedNumber = await simpleStorage.retrieve();
      expect(retrievedNumber).to.equal(numberToStore);
    });

    it("Should update the stored number when store is called multiple times", async function () {
      // Store first number
      await simpleStorage.store(10);
      expect(await simpleStorage.retrieve()).to.equal(10);

      // Store second number
      await simpleStorage.store(100);
      expect(await simpleStorage.retrieve()).to.equal(100);
    });
  });

  describe("NumberStored event", function () {
    it("Should emit NumberStored event with correct value when store is called", async function () {
      const numberToStore = 777;

      // Expect the NumberStored event to be emitted with the correct value
      await expect(simpleStorage.store(numberToStore))
        .to.emit(simpleStorage, "NumberStored")
        .withArgs(numberToStore);
    });

    it("Should emit NumberStored event with updated value on subsequent calls", async function () {
      // First store
      await expect(simpleStorage.store(123))
        .to.emit(simpleStorage, "NumberStored")
        .withArgs(123);

      // Second store with different value
      await expect(simpleStorage.store(456))
        .to.emit(simpleStorage, "NumberStored")
        .withArgs(456);
    });
  });

  describe("addPerson", function () {
    it("Should map a name to a favorite number", async function () {
      const name = "Alice";
      const favoriteNumber = 7;

      await simpleStorage.addPerson(name, favoriteNumber);

      const mappedNumber = await simpleStorage.nameToFavoriteNumber(name);
      expect(mappedNumber).to.equal(favoriteNumber);
    });
  });
});

