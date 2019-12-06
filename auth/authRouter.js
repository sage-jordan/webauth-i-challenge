const router = require('express').Router();
const restricted = require('./auth-middleware');

const Users = require('../users/users-model.js');

router.post('/register', restricted, (req, res) => {
    let user = req.body;

    Users.add(user)
        .then(saved => {
            res.status(200).json({saved})
        })
        .catch(err => {
            res.status(500).json({err});
        });
});

router.post('/login', restricted, (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ sername })
        .first()
        .then(user => {
            if(user){
                res.status(200).json({ message: `Welcome ${user.username}!`});
            } else {
                res.status(401).json({ message: `Invalid Cridentials` });
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router;