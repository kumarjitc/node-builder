const command = require('../build/run');
const configDB = require('../db/load').config;
const storeDB = require('../db/load').store;
const Select = require('../db/select');
const pull = require('../build/scripts/git');
const compile = require('../build/scripts/build');
const BuildData = require('../build/buildData');

const build = async (id, userData) => {
    let records = await new Select(configDB).searchById(id).execute();
    let store = await new Select(storeDB).execute();

    console.log("Analyzing Type - " + records[0].type);

    let buildData = new BuildData();
    switch (records[0].type) {
        case "pull":
            buildData = pull(records[0], userData, store);
        case 'build':
            buildData = compile(records[0], store);
    }

    await command.execute(buildData);
};

module.exports = {
    build: build
};
