const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()
const { PORT = 3333 } = process.env

app.use(express.static(path.resolve('public')))

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/index.html'))
})

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})