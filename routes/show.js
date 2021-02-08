const express = require("express");
const router = express.Router();
const showService = require("./../services/ShowService");

/**
 * @swagger
 * /show/list:
 *  get:
 *    summary: show list
 *    description: 공연 리스트
 *    parameters:
 *      - in: query
 *        name: order
 *        required: false
 *        description: 정렬 방법 - C; 최근순, O; 열린순, A; 가나다순, 입력 안할시 최근순
 *        schema:
 *          type: string
 *      - in: query
 *        name: isDone
 *        required: false
 *        description: 폐막 포함 여부
 *        schema:
 *          type: boolean
 *    responses:
 *       200:
 *         description: A list of Shows.
 */
router.get("/list", function (req, res, next) {
  const { order, isDone } = req.query;
  let useOrder = [[]];
  let query = {};
  switch (order) {
    case "O":
      useOrder = [["start_dt", "asc"]];
      break;
    case "A":
      useOrder = [["title", "asc"]];
      break;
    default:
      useOrder = [["create_dt", "asc"]];
      break;
  }
  if (!isDone) {
    query = {
      end_dt: { $gte: new Date() },
    };
  }

  showService
    .findAll(query, useOrder, 20, 0)
    .then((response) => {
      console.log(response);

      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
