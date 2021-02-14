const jwt = require("jsonwebtoken");
const { failed } = require("../common");

module.exports = {
  isLogined: (req, res, next) => {
    const token = req.cookies.user;
    if (!token) res.json(failed({}, "need login"));

    jwt.verify(token, req.app.get("jwt-secret"), (err, decoded) => {
      if(err) res.json(failed({}, "token error"));
      
      
      next();
    });
  },
};
