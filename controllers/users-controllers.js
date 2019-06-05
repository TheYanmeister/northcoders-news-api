const { fetchUserDataByUserName } = require("../models/users-models");

exports.sendUserData = (req, res, next) => {
  username = req.params.username;
  fetchUserDataByUserName(username)
    .then(userData => {
      res.status(200).send({ userData });
    })
    .catch(next);
};
