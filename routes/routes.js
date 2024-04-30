const express = require('express');
const router = express.Router();
const controllerMusic = require('./../controllers/music')

router.get('/', (req, res) => {
    res.status(200).json({success :'RACINE API'});
});

router.post('/', (req, res) => {
    res.status(200).json({success :'bounty'});
});

router.get('/music', controllerMusic.find)

router.post('/music', controllerMusic.create)

router.get('/music/:id', controllerMusic.findById)  

router.get('/music/random', controllerMusic.random)







module.exports = router;