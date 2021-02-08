const express = require("express");
const router = express.Router();
const userService = require("../services/UserService");
const jwt = require("jsonwebtoken");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

const login = (req, res, user) => {
  const jwt_secret = req.app.get("jwt-secret");
  const token = jwt.sign({ token: user.token }, jwt_secret, {
    expiresIn: "7d",
  });

  res.cookie("user", token);
  const userInfo = {
    userType: user.user_type,
    email: user.email,
    profileImg: user.profile_img
  };

  return userInfo;
};

router.post("/login", (req, res, next) => {
  const { user } = req.body;
  console.log(user);

  userService
    .findByEmail(user.email)
    .then((value) => {
      console.log(value);
      if (!value) {
        // 회원가입
        userService
          .create({
            ...user,
            user_type: "B",
            is_delete: false,
            create_dt: new Date(),
            update_dt: new Date(),
          })
          .then((value) => {
            res.json(req, res, login(value));
          })
          .catch((err) => {
            res.json(err);
          });
      } else {
        // 로그인
        res.json(login(req, res, value));
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
