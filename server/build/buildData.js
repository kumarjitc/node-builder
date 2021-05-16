class BuildData {
    constructor() {
    }

    set command(value) {
        this.cmd = value;
    }
    get command() {
        return this.cmd;
    }

    set context(value) {
        this.ctx = value;
    }
    get context() {
        return this.ctx;
    }

    get params() {
        return this.options;
    }
    set params(value) {
        this.options = value;
    }
}

module.exports = BuildData;
