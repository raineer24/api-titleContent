const knex = require('./knex'); // the connection

module.exports = {
  getAll(query) {
    const knexQuery = knex('postContent');

    if (query.title) {
      knexQuery.where('title', 'like', `%${query.title}%`);
    }
    if (query.content) {
      knexQuery.where('content', 'like', `%${query.content}%`);
    }

    return knexQuery;
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
  delete(id) {
    return knex('postContent')
      .where('id', id)
      .del();
  },
};
