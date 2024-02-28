const express = require('express');
const cors = require('cors');
const JWT = require('jsonwebtoken')
const JWT_SECRET = require('./config')
const rootRouter = require('./routes/index')
const app = express();

app.use(express.json())
app.use(cors())


app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.use('/api/v1',rootRouter);

let PORT =  3900
app.listen(PORT,(req,res)=>{
    console.log(`Listening to port ${PORT}`);
})
