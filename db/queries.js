const knex = require('./knex'); // the connection

module.exports = {
    getAll() {
        return knex('postContent');
    },
    getOne(id) {
        return knex('postContent').where('id', id).first();
    }
}