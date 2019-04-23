
exports.up = function(knex, Promise) {
  return knex.schema.createTable('postContent', (table) => {
      table.increments();
      table.text('title');
      table.text('content');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('postContent');
};
