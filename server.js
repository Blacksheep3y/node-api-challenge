// import express
const express = require('express');
// import routers
const actionRouter = require('./routes/actionsRouter')
const projectRouter = require('./routes/projectsRouter')

// start express on server
const server = express();

// server.use express
server.use(express.json());
// server.use routers
server.use('/api/actions', actionRouter)
server.use('/api/projects', projectRouter)

// on server start
server.get('/', (req, res) => {
    res.send(`The server is running`);
  });

module.exports = server;