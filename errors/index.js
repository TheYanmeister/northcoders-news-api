exports.routeNotFound = (req, res) => {
  res.status(404).send({ msg: "Route Not Found" });
};

exports.methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
};

exports.psqlError = (err, req, res, next) => {
  const psqlCodes = [];
  if (psqlCodes.includes(err.code))
    es.status(400).send({ msg: err.message || "Bad Request" });
  else next();
};
