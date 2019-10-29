const router = require('express').Router();

const Db = require('./db');

router.get('/', (req,res) => {
    Db.find(req.query)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Error retrieving the posts.' });
        });
})

router.post('/', (req, res) => {
    const postInfo = req.body;

    if(!postInfo.title || !postInfo.contents){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
    Db.insert(postInfo)
        .then(post => {
            res.status(201).json({post})
        })
        .catch(post => {
            res.status(500).json({ error: "There was an error while saving the post to the database" })
        })
    }
})



module.exports = router;


