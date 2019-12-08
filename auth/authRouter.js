const router = require('express').Router();
const restricted = require('./auth-middleware');
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model.js');

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.pass, 12);
    user.pass = hash;

    Users.add(user)
        .then(saved => {
            res.status(200).json({saved})
        })
        .catch(err => {
            res.status(500).json({err});
        });
});

router.post('/login', restricted, (req, res) => {
    let { username, pass } = req.body;
    console.log("Username, pass: ", username, pass);

    Users.findBy({ username })
        .first()
        .then(user => {
            console.log("User: ", user);
            if(user && bcrypt.compareSync(pass, user.pass)){
                res.status(200).json({ message: `Welcome ${user.username}!`});
            } else {
                res.status(401).json({ message: `Invalid Cridentials` });
            }
        })
        .catch(err => {
            res.status(500).json({ err: err.message })
        })
})

module.exports = router;