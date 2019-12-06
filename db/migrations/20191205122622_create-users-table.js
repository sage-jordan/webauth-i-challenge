
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
    tbl.string('username');
    tbl.string('pass');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
