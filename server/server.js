const express = require('express')
const app = express()
const port = 5000

const routes = require('./routes/routes');

app.use(express.json());

app.use('/', routes);

app.listen(port, ()=>{
    console.log( `Listening on port ${port} `)
})

module.exports = app;