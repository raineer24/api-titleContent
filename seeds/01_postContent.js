const contents = require('../contents');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('postContent').del()
    .then(function () {
      // Inserts seed entries
      return knex('postContent').insert(postContent);
    });
};
