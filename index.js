const express = require('express');

// 1 bring in the router
const DbRouter = require('./data/db-router');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send("Hello from the dark side of the moon.")
})

// 2 use the router
server.use('/api/posts', DbRouter);

server.listen(4000, () => {
    console.log('\n === Server Running on http://localhost:4000 === \n')
})