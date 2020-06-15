const express = require('express');
const router = express.Router();

const pMod = require('../data/helpers/projectModel');
// router.use('/:id', findID)




// POST - CREATE
router.post('/', (req, res) => {
    pMod.get()
        .then(project => {
            if (!req.body.name || !req.body.description || req.body.completed) {
                res.status(400).json({
                    Message: 'data is missing from one of the previous entries'
                })
            } else {
                pMod.insert(req.body)
                    .then(project => {
                        res.status(201).json(project)
                    })
                    .catch(err => {
                        res.status(500).json({
                            Message: 'Error in completing post'
                        })
                    })
            }
        })
        .catch(err => {
            res.status(500).json({ Message: 'OOPS! Something went wrong!' })
        })
})




// GET - READ
router.get('/', (req, res) => {
    pMod.get()
        .then(project => {
            res.status(200).json({ project })
        })
        .catch(err => {
            res.status(500).json({ Message: 'Project is empty or does not exist' })
        })
})

router.get('/:id', (req, res) => {
    pMod.get(req.params.id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                Message: 'The project with this "ID" could not be found or it does not exist'
            })
        })
})




// PUT - UPDATE

// DELETE - DELETE

module.exports = router;