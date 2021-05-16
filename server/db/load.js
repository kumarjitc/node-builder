const DB = require('nedb');
const configStore = new DB({
    filename: 'data/build-config.db'
});

const buildStore = new DB({
    filename: 'data/build-execution.db'
});

const storeValuesStore = new DB({
    filename: 'data/store.db'
});

const workflowValuesStore = new DB({
    filename: 'data/workflow.db'
});

configStore.ensureIndex({
    fieldName: 'name',
    unique: true
});

storeValuesStore.ensureIndex({
    fieldName: 'name',
    unique: true
});

workflowValuesStore.ensureIndex({
    fieldName: 'name',
    unique: true
});

configStore.loadDatabase(function (error) {
    if (error) {
        console.error(error);
    }
});

buildStore.loadDatabase(function (error) {
    if (error) {
        console.error(error);
    }
});

storeValuesStore.loadDatabase(function (error) {
    if (error) {
        console.error(error);
    }
});

workflowValuesStore.loadDatabase(function (error) {
    if (error) {
        console.error(error);
    }
});

module.exports = {
    config: configStore,
    build: buildStore,
    store: storeValuesStore,
    workflow: workflowValuesStore
}
