const knex = require('knex')('production');

const config = require('../knexfile');

const db = knex(config.dev);

module.exports = db;