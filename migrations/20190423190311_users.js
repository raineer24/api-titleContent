
exports.up = function(knex, Promise) {
  return Promise.resolve()
  .then(() => knex.schema.createTable('postContent', (table)=> {
    table.increments();
      table.text('title');
      table.text('content');
  }))
 .then(() => knex.schema.createTable('users', (table)=> {
    table.increments('id').primary();
           table.datetime('createdAt');
           table.datetime('updatedAt');

           table.string('phoneNumber').notNullable().unique();
           table.string('password').notNullable();            
           table.string('name').notNullable().unique(); 
           table.string('lastName').notNullable().unique();        
           table.string('email');                             
           table.string('status');                            
           table.string('roles').defaultTo('user');           
  }))
};

exports.down = function(knex, Promise) {
 return Promise.resolve()
 .then(() => knex.schema.dropTable('postContent'))
  .then(() => knex.schema.dropTable('users'))
};