const express = require('express')
const router = express.Router();
const validURL = require('valid-url');
const shortid = require('shortid');
const config = require('config');
const Url = require('../models/Url');

//create short url
router.post('/minify', async(req, res)=>{
const {longUrl} = req.body;
const baseURL = config.get('baseURL');

if(!validURL.isUri(baseURL)){
    return res.status(401).json('Invalid baseURL');
}
//Generate id
const urlCode = shortid.generate();

//check longURL
if(validURL.isUri(longUrl)){
    try{
        let url = await Url.findOne({longUrl});
        if(url) return res.json(url);
        else {
            const shortUrl = baseURL + '/' + urlCode;
            url = new Url({
                longUrl,
                shortUrl,
                urlCode,
                date:new Date()
            });
            
            
            await url.save();
            res.json(url)
        }
    }catch(err){
        console.error(err);
        res.status(500).json('Server error');
    }
}else{
    res.status(404).json('invalid url')
}    

});


module.exports = router;