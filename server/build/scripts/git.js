const path = require('path');
const BuildData = require('../buildData');

const appDirectory = path.resolve(__dirname, ['..', 'app'].join(path.sep));
const COMMAND = 'git';

const pull = (build, userData, store) => {
    const repoUrl = store.filter(record => {
        return record.name === 'REPO_URL';
    })[0]['value'];

    const sourceDir = store.filter(record => {
        return record.name === 'SOURCE_DIR';
    })[0]['value'];

    const appPath = [appDirectory, sourceDir].join(path.sep);
    const url = `https://${userData.username}:${userData.password}@${repoUrl}`;


    const data = new BuildData();
    data.command = COMMAND;
    data.context = appPath;
    data.params = ["pull", encodeURI(url), build.branch];

    return Object.seal(data);
}

module.exports = pull;
