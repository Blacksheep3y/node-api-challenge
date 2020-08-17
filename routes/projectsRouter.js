  // import express
  const express = require('express')
  // use express on Router
  const router = express.Router()
  // use middleware
  const ph = require('../data/helpers/projectModel')
  const {validateIdP} = require('../middleware/ap-midware')
  
// GET Projects
  router.get('/', (req, res) => {
    ph.get()
        .then(project => {
            res.status(200).json({ project })
        })
        .catch(err => {
            res.status(500).json({ Message: 'There are no Projects available.' })
        })
})
// GET Project by ID
router.get('/:id', validateIdP, (req, res) => {
  ph.get(req.params.id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            Message: 'Could not find your project, it may not exist'
        })
    })
})
// GET Actions by Project ID
router.get('/:id/actions', validateIdP, (req, res) => {
    ph.getProjectActions(req.params.id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            res.status(500).json({
                Message: `Could not find your Project's action`
            })
        })
})
// POST Project
router.post('/', (req, res) => {
    ph.get()
        .then(project => {
            if (!req.body.name || !req.body.description || req.body.completed) {
                res.status(400).json({
                    Message: 'One or more fields missing'
                })
            } else {
                ph.insert(req.body)
                    .then(project => {
                        res.status(201).json(project)
                    })
                    .catch(err => {
                        res.status(500).json({
                            Message: 'Failed to create post'
                        })
                    })
            }
        })
        .catch(err => {
            res.status(500).json({ Message: 'Something went wrong!' })
        })
})
// PUT (EDIT) Project By ID
router.put('/:id', validateIdP, (req, res) => {
    ph.get(req.params.id)
        .then(project => {
            if (project.length === 0) {
                res.status(404).json({
                    Message: 'Could not update post'
                })
            } else if (!req.body.name || !req.body.description || req.body.completed) {
                res.status(400).json({
                    Message: 'One or more fields missing'
                })
            } else {
                ph.update(req.params.id, req.body)
                    .then(project => {
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
            res.status(500).json({ Message: 'these are not the droids you are looking for' })
        })
})
// DELETE Project by ID
router.delete('/:id', validateIdP, (req, res) => {
    ph.remove(req.params.id)
        .then(project => {
            res.status(200).json({ message: 'Successfully removed the following project: >> ', project: req.project })
        })
})

module.exports = router;  