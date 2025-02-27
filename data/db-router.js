const router = require('express').Router();

const Db = require('./db');



// === 1 === When the client makes a `POST` request to `/api/posts`:
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

// === 2 === When the client makes a `POST` request to `/api/posts/:id/comments`:

router.post('/:id/comments', (req, res) => {
    const comment = req.body;

    if(!comment.post_id || comment.post_id === {} || comment.post_id === null ){
        // console.log(id)
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }else if(!comment.text){ 
        // console.log(comment.text)
        res.status(400).json({ errorMessage: "Please provide text for the comment." })
    } else {
        Db.insertComment(comment)
        .then(result => {
            console.log(result)
            res.status(201).json(result)
        })
        .catch(error => {
            res.status(500).json({ error: "There was an error while saving the comment to the database"})
        })
    }
})


// === 3 === When the client makes a `GET` request to `/api/posts`:
router.get('/', (req,res) => {
    Db.find(res.query)
        .then(posts => {
            // console.log(req.query); ==> returns an empty object
            console.log(posts);
            res.status(200).json(posts);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'The post information could not be retrieved.' });
        });
})

// === 4 === When the client makes a `GET` request to `/api/posts/:id`:
router.get('/:id', (req,res) => {
    const {id} = req.params;

    if(id === null || id === {} || !id || id === req.body.id){
        console.log(id);
        res.status(404).json({ message: "The post with the specified ID does not exist."})
    } else {
        Db.findById(id)
            .then(posts => {
                // console.log(req.query); ==> returns an empty object
                console.log(posts);
                res.status(200).json(posts);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: 'The post information could not be retrieved.' });
            });
    }
})

// === 5 === When the client makes a `GET` request to `/api/posts/:id/comments`:
router.get('/:id/comments', (req, res) => {
        const {id} = req.params;

        if(id === null || id === {} || !id || id === req.body.id){
            console.log(id);
            res.status(404).json({ message: "The comment with the specified ID does not exist."})
        } else {
            Db.findCommentById(id)
                .then(comment => {
                    // console.log(req.query); ==> returns an empty object
                    console.log(comment);
                    res.status(200).json(comment);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ error: 'The comment information could not be retrieved.' });
                });
        }
})

// === 6 === When the client makes a `DELETE` request to `/api/posts/:id`:
router.delete('/:id', (req, res) => {
    const {id} = req.params;

    if(id === null || id === {} || !id || id === req.body.id){
        res.status(404).json({ message: "The post with the specified ID does not exist."})
    } else {
        Db.remove(id)
            .then(() => {
                res.status(200).json({ message: "The post was deleted."})
            })
            .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                error: 'The post could not be removed.',});
        })
    }
});

// === 7 === When the client makes a `PUT` request to `/api/posts/:id`:
router.put(`/:id`, (req, res) => {
    // const changes = req.body;
    const {id} = req.params;
    if(id === null || id === {} || !id || req.params.id === req.body.id){
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    } else if(!req.body.title || !req.body.contents){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        Db.update(id, req.body)
        .then(updatePost => {
            console.log(updatePost);
            res.status(200).json(updatePost)
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be modified." })
        })
    }
})

module.exports = router;


