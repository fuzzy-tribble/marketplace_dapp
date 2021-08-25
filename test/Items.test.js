const Items = artifacts.require("Items");
const { sampleItem, noItems } = require("./TestData.js");

contract("Items", (accounts) => {
    // It extends Mocha's describe() by providing a list of accounts for testing and doing some cleanup as well.

    let [alice, bob] = accounts;
    let itemsContract;

    // Get the contract
    before(async () => {
        itemsContract = await Items.deployed();
    });

    // Check getItems() iff no items, iff > 0 items
    it("can fetch the list of items and verifiy its emtpy", async () => {
        const items = await itemsContract.getItems();
        // assert.equal(items.logs[0].args.items, [],'not empty aray');
        // assert.equal(items.receipt.status, true,'not true');
        assert.equal(items, [], "The items list should be empty if none have been added");
    });

    it("Should be able to create an item", async () => {
        const titles = ["bad", "mamba"];
        // const i = sampleItem;
        const result = await itemsContract.create(_title = titles[0], _description = 'i.description', _price = 150, _attached_media = [2586], {
            from: alice
        });
        console.log(result);

        assert.equal(result.receipt.status, true, 'not true');
        assert.equal(result.logs[0].args.title, "bad");
    });

    // Check getItems() iff no items, iff > 0 items
    it("can fetch the list of items", async () => {
        const items = await itemsContract.getItems();
        // assert.equal(items.logs[0].args.items, [],'not empty aray');
        // assert.equal(items.receipt.status, true,'not true');
        assert.equal(items[0]['title'], "bad", "The items list should be empty if none have been added");
    });


});