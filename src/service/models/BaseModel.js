'use strict';
/* eslint-disable no-invalid-this */

const {
  Model
} = require(`sequelize`);

const _ = require(`lodash`);

class BaseModel extends Model {
  async reload() {
    return super.reload(this.constructor.getQueryOptions());
  }
  /*
   * Требуется для тестов т.к метод toJSON
   * не преобразует дату в строку
   */
  convertToJSON() {
    return JSON.parse(JSON.stringify(this.toJSON()));
  }

  toExclude() {
    return [];
  }

  toJSON() {
    return _.omit(super.toJSON(), this.toExclude());
  }

  static async paginate(page = 1, limit = 8, opts) {
    let items;

    const options = {...this.getQueryOptions(), ...opts};
    const total = await this.count(options);
    const totalPages = Math.ceil(total / limit);
    const offset = limit * (page - 1);

    items = total >= limit * (page - 1) ?
      await this.findAll({...options, limit, offset}) : [];

    return {
      currentPage: page,
      total,
      items,
      totalPages
    };
  }

  static getThumbnail(name) {
    return function () {
      const picture = this.getDataValue(name);
      if (!picture) {
        return null;
      }

      return {
        small: picture,
        big: picture.replace(/\.(?=[^.]*$)/, `@2x.`)
      };
    };
  }

  static getQueryOptions() {
    return {};
  }
}

module.exports = BaseModel;
