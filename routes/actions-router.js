const express = require('express');
const router = express.Router();

const aMod = require('../data/helpers/actionModel');
router.use('/:id', findID)




// POST - CREATE
router.post('/', (req, res) => {
    aMod.get()
        .then(action => {
            if (!req.body.project_id || !req.body.description || req.body.completed) {
                res.status(400).json({
                    Message: 'Data is missing from one of the previous entries'
                })
            } else {
                aMod.insert(req.body)
                    .then(action => {
                        res.status(201).json(action)
                    })
                    .catch(err => {
                        res.status(500).json({
                            Message: 'Error in completing post, must be missing a previous field'
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
    res.status(200).json('All existing actions pertain an id, please enter one!')
})

router.get('/:id', (req, res) => {
    aMod.get(req.params.id)
        .then(action => {
            res.status(200).json(req.action)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ Message: "An action with this `ID` doesn't exist!" })
        })
})




// PUT - UPDATE
router.put('/:id', (req, res) => {
    aMod.get(req.params.id)
        .then(action => {
            if (action.length === 0) {
                res.status(404).json({
                    Message: 'Post could not be completed'
                })
            } else if (!req.body.project_id || !req.body.description || !req.body.completed) {
                res.status(400).json({
                    Message: 'Data is missing from one of the previous entries'
                })
            } else {
                aMod.update(req.params.id, req.body)
                    .then(action => {
                        res.status(201).json(req.body)
                    })
                    .catch(err => {
                        res.status(500).json({
                            Message: 'Post has failed!'
                        })
                    })
            }
        })
        .catch(err => {
            res.status(500).json({ Message: 'OOPS! Something went wrong!' })
        })
})




// DELETE - DELETE
router.delete('/:id', (req, res) => {
    aMod.remove(req.params.id)
        .then(action => {
            res.status(200).json({ message: 'Project at this `ID` has been removed' })
        })
})



function findID(req, res, next) {
    const id = req.params.id
    aMod.get(id)
        .then(action => {
            if (!action) {
                res.status(400).json({
                    Message: "The action at this `ID` doesn't exist"
                })
            } else {
                req.action = action
                next()
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                Message: "Request for `ID` in actions couldn't be found!"
            })
        })
}


module.exports = router;