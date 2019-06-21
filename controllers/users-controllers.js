const { fetchUserDataByUserName } = require("../models/users-models");

exports.sendUserData = (req, res, next) => {
  username = req.params.username;
  fetchUserDataByUserName(username)
    .then(userData => {
      if (userData.length === 0)
        return Promise.reject({ status: 404, msg: "user not found" });
      else res.status(200).send({ user });
    })
    .catch(next);
};
