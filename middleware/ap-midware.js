  // require db to use functions
    const ah = require('../data/helpers/actionModel')
    const ph = require('../data/helpers/projectModel')
    
  // custom middleware
    function validateIdA(req, res, next) {
        const id = req.params.id
        ah.get(id)
            .then(action => {
                if (!action) {
                    res.status(400).json({
                        Message: 'The action doesnt exist'
                    })
                } else {
                    req.action = action
                    next()
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    Message: ' can not validate'
                })
            })
    }

    function validateIdP(req, res, next) {
        const id = req.params.id
        ph.get(id)
            .then(project => {
                if (!project) {
                    res.status(400).json({
                        Message: 'The project does not exist'
                    })
                } else {
                    req.project = project
                    next()
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    Message: 'could not validate'
                })
            })
    }

    module.exports = 
    {
      validateIdA,
      validateIdP,
    };