const express = require('express');
const router = express.Router();
const sign = require('../controller/signIn.controller');

//Write APIs here

router.get('/signs',sign.getSigns);
router.get('/sign/:id',sign.getSign);
router.put('/sign/:id',sign.updateSign);
router.delete('/sign/:id',sign.deleteSign);
router.post('/sign',sign.addSign);

module.exports = router;