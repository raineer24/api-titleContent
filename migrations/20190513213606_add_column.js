
exports.up = function(knex, Promise) {
   return knex.raw(`
    ALTER TABLE "postContent" 
ADD COLUMN image bytea;
  `)
};

exports.down = function(knex, Promise) {
   return knex.raw(`
   ALTER TABLE "postContent"
ADD COLUMN image bytea;
  `)
};


