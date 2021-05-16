const db = require('../db/load').config;
const Update = require('../db/update');
const Select = require('../db/select');
const Delete = require('../db/delete');

const selectAll = () => {
    return new Select(db)
        .execute();
}

const selectOne = (id) => {
    return new Select(db)
        .searchById(id)
        .execute();
}

const insert = (data) => {
    return new Update.Insert(db)
        .addDocument(data)
        .execute();
}

const update = (id, data) => {
    return new Update.Update(db)
        .updateById(id)
        .addDocument(data)
        .execute();
}

const remove = (id) => {
    return new Delete(db)
        .deleteById(id)
        .execute();
}

module.exports = {
    selectAll: selectAll,
    selectOne: selectOne,
    insert: insert,
    update: update,
    delete: remove
}
