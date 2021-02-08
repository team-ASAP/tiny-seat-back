const Theater = require("../models/Theater");

module.exports = {
  create: (theater) => {
    return Theater.create(theater);
  },
  update: (theater_no, theater) => {
    return Theater.update(theater, {
      where: {
        no: theater_no,
      },
    });
  },
  findByNo: (no) => {
    return Theater.findOne({
      where: {
        no: no,
        is_delete: false,
      },
    });
  },
  findAll: (query = {}, order = [[]], limit = 20, offset = 0) => {
    return Theater.findAll({
      where: {
        ...query,
        is_delete: false,
      },
      // [['name', 'asc'], ['create_dt', 'desc']]
      order: order,
      offset: offset,
      limit: limit,
      attributes: ["name", "profile_img"],
    });
  },
};
