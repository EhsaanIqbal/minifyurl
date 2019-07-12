const express = require("express");
const router = express.Router();

const Url = require("../models/Url");

router.get("/:code", async (req, res) => {
  try {
    const url =await Url.findOne({ urlCode: req.params.code });
    if (url) {
      return res.redirect(url.longUrl);
    } else {
      res.status(404).json("No url found");
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
