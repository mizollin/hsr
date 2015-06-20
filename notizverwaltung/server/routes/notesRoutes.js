var express = require('express');
var router = express.Router();
var notes = require('../controller/notesController.js');

router.get("/", notes.getNotes);
router.post("/", notes.createNote);
router.get("/:id/", notes.getNote);
router.delete("/:id/", notes.deleteNote);
router.put("/:id/", notes.updateNote);

module.exports = router;