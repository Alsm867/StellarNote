const express = require("express");
const asyncHandler = require("express-async-handler");
const { Note } = require("../../db/models");
const router = express.Router();
const {Op} = require('sequelize')



router.put(
    "/",
    asyncHandler(async function (req, res) {
      const search = req.body.input
      let notes
      let searchResult = false
      if (search !== undefined){
          notes = await Note.findAll({
              where: {
                  content :{
                      [Op.iLike]: `%${search}%`
                  }
              }
          })
          if (notes.length > 0){
              searchResult = true
          }
      } else {
          searchResult = false;
          notes = await Note.findAll()
      }
      return res.json(notes)
    })
  );
  module.exports = router;
