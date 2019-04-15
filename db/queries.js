const knex = require('./knex'); // the connection

module.exports = {
  getAll() {
    return knex('postContent');
  },
  getOne(id) {
    return knex('postContent')
      .where('id', id)
      .first();
  },
  create(content) {
    return knex('postContent').insert(content, '*');
  },
  update(id, content) {
    return knex('postContent')
      .where('id', id)
      .update(content, '*');
  },
};
