const User = require('../models/User');

module.exports = {
  findByEmail: email => {
    return User.findOne({
      where: {
        email: email,
        is_delete: false
      }
    })
  },
  findByToken: token => {
    return User.findOne({
      where: {
        token: token,
        is_delete: false
      }
    })
  },
  create: user => {
    return User.create(user)
  },
  updateUserType: (user_type, user_id) => {
    return User.update({
      user_type: user_type
    }, {
      where: {
        no: user_id
      }
    })
  }
}