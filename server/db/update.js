const ResponseFormat = require('../response/response-format');

class Insert {
    constructor(db) {
        this.db = db;
        this.doc = {};
    }

    addDocument(doc) {
        this.doc = doc;

        return this;
    }

    addField(field, value) {
        this.doc[field] = value;

        return this;
    }

    execute() {


        return new Promise((resolve, reject) => {
            this.db.insert(this.doc, (error, inserted) => {
                if (error) {
                    console.log(error);
                }
                resolve(inserted);
            });
        });
    }
}

class Update {
    constructor(db) {
        this.db = db;
        this.doc = {};
        this.condition = {};
    }

    addDocument(doc) {
        this.doc = doc;

        return this;
    }

    addField(field, value) {
        this.doc[field] = value;

        return this;
    }

    addCondition(condition) {
        this.condition = condition;

        return this;
    }

    updateById(id) {
        this.condition['_id'] = id;

        return this;
    }

    execute() {
        return new Promise((resolve, reject) => {
            this.db.update(this.condition, this.doc, { multi: true }, (error, numReplaced) => {
                if (error) {
                    console.log(error);
                }

                if (numReplaced === 0) {
                    resolve(new ResponseFormat.Formatter()
                        .addErrorMessage(ResponseFormat.ERROR_NO_RECORD_FOUND)
                        .build()
                    );
                } else {
                    resolve(new ResponseFormat.Formatter()
                        .addSuccessMessage(`${numReplaced}${ResponseFormat.SUCCESS_RECORD_UPDATED}`)
                        .build()
                    );
                }
            });
        });
    }
}

module.exports = {
    Insert: Insert,
    Update: Update
};
