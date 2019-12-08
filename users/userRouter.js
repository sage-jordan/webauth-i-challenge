const router = require('express').Router();
const Users = require('./users-model');

router.get('/', (req, res) => {
    console.log("Fetching users..");
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    console.log(`Getting user with id ${id}`)
    Users.findById(id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    console.log(`Deleting user ${id}`);
    Users.remove(id)
        .then(deleted => {
            res.status(200).json(`User id: ${id} successfully deleted`);
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

module.exports = router;