const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');

// Define song routes
router.get('/', songController.getAllSongs);
router.post('/', songController.createSong);
router.post('/like/:songId', songController.likeSong);
router.post('/unlike/:songId', songController.unlikeSong);
router.delete('/:songId', songController.deleteSong);

module.exports = router;
