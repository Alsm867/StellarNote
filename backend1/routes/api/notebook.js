const express = require("express");
const asyncHandler = require("express-async-handler");
const { Notebook } = require("../../db/models");

const router = express.Router();

router.get("/:id", asyncHandler(async function (req, res) {
    const notes = await Notebook.findAll({
        where: {
        userId: req.params.id,
        },
    });
    return res.json(notes);
    }));

router.post("/", asyncHandler(async function (req, res) {
    const { name, userId } = req.body;
    const notebook = await Notebook.create({
        userId,
        name,
    });
    return res.json(notebook);
}));


router.delete("/:id", asyncHandler(async function (req, res) {
    const notebook = await Notebook.findByPk(req.params.id);
    const note = await notebook.destroy();
    return res.json(note);
}));

router.put("/edit/:id", asyncHandler(async function (req, res) {
    const { name, id } = req.body;
    const values = { name: name };
    const condition = { where: { id: id } };
    await Notebook.update(values, condition);
    const notebook = await Notebook.findByPk(id);
    return res.json(notebook);
}));

module.exports = router;
