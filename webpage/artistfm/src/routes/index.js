var express = require('express');
var router = express.Router();
const userController = require('../controllers/user');
const artistController = require('../controllers/artist');
const songController = require('../controllers/song');

/* Webpack looks for /public/index.html automatically to render homepage. */

// User
router.get('/api/user/', userController.getAll);
router.get('/api/user/:id', userController.get);
router.post('/api/user/', userController.post);
router.put('/api/user/:id', userController.put);
router.delete('/api/user/:id', userController.delete);

// Artist
router.get('/api/artist/', artistController.getAll);
router.get('/api/artist/:id', artistController.get);
router.post('/api/artist/', artistController.post);
router.put('/api/artist/:id', artistController.put);
router.delete('/api/artist/:id', artistController.delete);
router.get('/api/artist/search/:name', artistController.getByName);

// Song
router.get('/api/artist/:artist_id/song/', songController.getAll);
router.get('/api/artist/:artist_id/song/:id', songController.get);
router.post('/api/artist/:artist_id/song/', songController.post);
router.put('/api/artist/:artist_id/song/:id', songController.put);
router.delete('/api/artist/:artist_id/song/:id', songController.delete);

module.exports = router;