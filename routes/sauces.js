const express = require('express');
const router = express.Router();

const saucesCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');

router.get('/', auth, saucesCtrl.getAllSauce);
router.post('/', auth, saucesCtrl.createSauce);
router.get('/:id', saucesCtrl.getOneSauce);

module.exports = router;