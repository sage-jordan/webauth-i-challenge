
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
    tbl.string('username', 128).unique().notNullable();
    tbl.string('pass', 128).notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
