const express = require("express");

const routes = express.Router({
  mergeParams: true,
});

routes.get("/", (req, res) => {
  res.status(200).json({
    repositories: [
      { id: 1, state: 604 },
      { id: 2, state: 605 },
      { id: 3, state: 606 },
    ],
  });
});

module.exports = { routes };
