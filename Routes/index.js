const express = require('express');
const api = express.Router();

api.get('/',(req,res)=>{
    res.end("Soy el login")
});
module.exports = api;