var express = require("express");
var router = express.Router();
var notesController = require("../controller/notesController.js");

router.get("/", notesController.getNotes);
router.post("/", notesController.createNote);
router.get("/:id/", notesController.getNote);
router.delete("/:id/", notesController.deleteNote);
router.put("/:id/", notesController.updateNote);

module.exports = router;