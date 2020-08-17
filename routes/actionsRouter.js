  // import express
  const express = require('express')
  // use express on Router
  const router = express.Router()
  // use middleware
  const ah = require('../data/helpers/actionModel')
  const {validateIdA} = require('../middleware/ap-midware')

// GET Actions
router.get('/', (req, res) => {
    res.status(200).json(`there are no actions that lack an id`)
})
// GET Actions by ID
router.get('/:id', validateIdA, (req, res) => {
    ah.get(req.params.id)
        .then(action => {
            res.status(200).json(req.action)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ Message: 'there is no action at this id' })
        })
})
// POST Action
router.post('/', (req, res) => {
    ah.get()
        .then(action => {
            if (!req.body.project_id || !req.body.description || req.body.completed) {
                res.status(400).json({
                    Message: 'One or more fields missing'
                })
            } else {
                ah.insert(req.body)
                    .then(action => {
                        res.status(201).json(action)
                    })
                    .catch(err => {
                        res.status(500).json({
                            Message: 'failed to make a post'
                        })
                    })
            }
        })
        .catch(err => {
            res.status(500).json({ Message: 'Something went wrong!' })
        })
})
// PUT (EDIT) ACTION by ID
router.put('/:id', validateIdA, (req, res) => {
    ah.get(req.params.id)
        .then(action => {
            if (action.length === 0) {
                res.status(404).json({
                    Message: 'Could not update post'
                })
            } else if (!req.body.project_id || !req.body.description || !req.body.completed) {
                res.status(400).json({
                    Message: 'One or more fields missing'
                })
            } else {
                ah.update(req.params.id, req.body)
                    .then(action => {
                        res.status(201).json(req.body)
                    })
                    .catch(err => {
                        res.status(500).json({
                            Message: 'Failed to complete post'
                        })
                    })
            }
        })
        .catch(err => {
            res.status(500).json({ Message: 'this is an error message' })
        })
})
// DELETE Action by ID
router.delete('/:id', validateIdA, (req, res) => {
    ah.remove(req.params.id)
        .then(action => {
            res.status(200).json({ message: 'project has been deleted', project: req.action })
        })
})

module.exports = router;