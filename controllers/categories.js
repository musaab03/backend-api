const { selectCategories } = require("../models/categories");

exports.sendCategories = (req, res, next) => {
  selectCategories()
    .then((categories) => {
      res.status(200).send({ categories });
    })
    .catch((err) => next(err));
};
