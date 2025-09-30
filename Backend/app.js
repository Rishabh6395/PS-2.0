const express = require('express')
const authRoutes = require('./route/auth.route')

const app = express()
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Hello PS')
})

app.use('/api/auth', authRoutes)



module.exports = app