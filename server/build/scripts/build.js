const path = require('path');
const BuildData = require('../buildData');

const appDirectory = path.resolve(__dirname, ['..', 'app'].join(path.sep));

const compile = (build, store) => {
    const sourceDir = store.filter(record => {
        return record.name === 'SOURCE_DIR';
    })[0]['value'];

    const appPath = [appDirectory, sourceDir].join(path.sep);

    // @Todo - Check this hardcoded strings
    const buildScript = build.type === 'pull' ? 'git pull' : build.buildScript;
    const scriptParts = buildScript.split(' ');
    const data = new BuildData();
    data.command = scriptParts[0];
    data.context = appPath;
    data.params = scriptParts.slice(1, build.length);

    return Object.seal(data);
}

module.exports = compile;
