const SUCCESS_MESSAGE_KEY = 'message';
const ERROR_MESSAGE_KEY = 'errorMessage';

const ERROR_NO_RECORD_FOUND = 'No Records Found';
const SUCCESS_RECORD_UPDATED = ' Record(s) Updated/Removed Succesfully';

class ResponseFormat {
    constructor() {
        this.response = {};
    }

    addErrorMessage(message) {
        this.response[ERROR_MESSAGE_KEY] = message;

        return this;
    }

    addSuccessMessage(message) {
        this.response[SUCCESS_MESSAGE_KEY] = message;

        return this;
    }

    build() {
        return this.response;
    }
}

module.exports = {
    Formatter: ResponseFormat,
    ERROR_NO_RECORD_FOUND: ERROR_NO_RECORD_FOUND,
    SUCCESS_RECORD_UPDATED: SUCCESS_RECORD_UPDATED
};
