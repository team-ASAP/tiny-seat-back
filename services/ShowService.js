const Show = require("./../models/Show");

module.exports = {
  create: (show) => {
    return Show.create(show);
  },
  update: (show_no, show) => {
    return Show.update(show, {
      where: {
        no: show_no,
      },
    });
  },
  findByNo: (no) => {
    return Show.findOne({
      where: {
        no: no,
        is_delete: false,
      },
    });
  },
  findAll: (query = {}, order = [[]], limit = 20, offset = 0) => {
    return Show.findAll({
      where: {
        ...query,
        is_delete: false,
      },
      order: order,
      offset: offset,
      limit: limit,
      attributes: ["no", "title", "thumnail"],
    });
  },
  findByTheaterId: (theater_id) => {
    return Show.findAll({
      where: {
        theater_id: theater_id,
        is_delete: false,
      },
    });
  },
};
