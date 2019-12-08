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
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)){
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