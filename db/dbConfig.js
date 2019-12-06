const knex = require('knex')('production');

const config = require('../knexfile');

const db = knex(config.development);

module.exports = db;