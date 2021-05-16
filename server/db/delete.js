const ResponseFormat = require('../response/response-format');

class Delete {
    constructor(db) {
        this.db = db;
        this.condition = {};
    }

    deleteById(id) {
        this.condition['_id'] = id;

        return this;
    }

    addCondition(field, name) {
        this.condition[field] = name;

        return this;
    }

    execute() {
        return new Promise((resolve, reject) => {
            this.db.remove(this.condition, { multi: true }, function (error, numRemoved) {
                if (error) {
                    reject(error);
                }

                if (numRemoved === 0) {
                    resolve(new ResponseFormat.Formatter()
                        .addErrorMessage(ResponseFormat.ERROR_NO_RECORD_FOUND)
                        .build()
                    );
                } else {
                    resolve(new ResponseFormat.Formatter()
                        .addSuccessMessage(`${numRemoved}${ResponseFormat.SUCCESS_RECORD_UPDATED}`)
                        .build()
                    );
                }
            });
        });
    }
}

module.exports = Delete;
