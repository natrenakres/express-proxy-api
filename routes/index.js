const url = require('url');
const express = require("express");
const router = express.Router();
const needle = require('needle');
const apiCache = require('apicache');

const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;


let cache = apiCache.middleware;


router.get("/", cache('2 minutes'), async (req, res) => {
    try {
        console.log(API_KEY_VALUE);

        const prams = new URLSearchParams({
            [API_KEY_NAME]: API_KEY_VALUE,
            ...url.parse(req.url, true).query
        });

        const link = `${API_BASE_URL}?${prams}`;
        if (process.env.NODE_ENV !== 'production') {
            console.log(link);            
        }

        const apiRes = await needle('get', link);
        const data = apiRes.body;
    
        res.status(200).json(data);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }

});


module.exports = router;