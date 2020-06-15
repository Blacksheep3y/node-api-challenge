const express = require('express');
const router = express.Router();

const aMod = require('../data/helpers/actionModel');
// router.use('/:id', findID)

// POST - CREATE

// GET - READ
router.get('/', (req, res) => {
    res.status(200).json('All existing actions currently pertain an id')
})

// PUT - UPDATE

// DELETE - DELETE

module.exports = router;