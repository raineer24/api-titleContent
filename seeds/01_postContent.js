const postContent = require("../contents");

// eslint-disable-next-line func-names
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return (
    knex("postContent")
      .del()
      // eslint-disable-next-line func-names
      .then(() =>
        // Inserts seed entries
        // eslint-disable-next-line implicit-arrow-linebreak
        knex("postContent").insert(postContent)
      )
  );
};
