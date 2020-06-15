const express = require('express');
const router = express.Router();

const pMod = require('../data/helpers/projectModel');
router.use('/:id', findID)




// POST - CREATE
router.post('/', (req, res) => {
    pMod.get()
        .then(project => {
            if (!req.body.name || !req.body.description || req.body.completed) {
                res.status(400).json({
                    Message: 'Data is missing from one of the previous entries'
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

router.get('/:id/actions', (req, res) => {
    pMod.getProjectActions(req.params.id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            res.status(500).json({
                Message: 'Action could not be found or it may not exist'
            })
        })
})




// PUT - UPDATE
router.put('/:id', (req, res) => {
    pMod.get(req.params.id)
        .then(project => {
            if (project.length === 0) {
                res.status(404).json({
                    Message: 'Post could not be made'
                })
            } else if (!req.body.name || !req.body.description || req.body.completed) {
                res.status(400).json({
                    Message: 'Data is missing from a previous entry'
                })
            } else {
                pMod.update(req.params.id, req.body)
                    .then(project => {
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
    pMod.remove(req.params.id)
        .then(project => {
            res.status(200).json({ message: 'Project at this `ID` has been removed' })
        })
})


function findID(req, res, next) {
    const id = req.params.id
    pMod.get(id)
        .then(project => {
            if (!project) {
                res.status(400).json({
                    Message: "The project at this `ID` doesn't exist"
                })
            } else {
                req.project = project
                next()
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                Message: "Request for `ID` in projects couldn't be found!"
            })
        })
}


module.exports = router;