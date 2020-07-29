'use strict';

const dbService = require(`../db-service`);
const {isClass} = require(`../../utils`);

const fs = require(`fs`);
const path = require(`path`);
const Sequelize = require(`sequelize`);
const basename = path.basename(__filename);
const db = {};

let service = dbService.create();

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf(`.`) !== 0) && (file !== basename) && (file.slice(-3) === `.js`);
  })
  .forEach((file) => {
    const definer = require(path.join(__dirname, file));
    if (!isClass(definer)) {
      const model = definer(service.sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    }
  });


Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


db.service = service;
module.exports = db;
