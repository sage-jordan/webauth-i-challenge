const Users = require('../users/users-model'); 
const bcrypt = require('bcryptjs');

module.exports = function restricted (rec, res, next){
    const { username, password } = req.headers;

    if(username && password){
        Users.findBy({ username })
            .first()
            .then(user => {
                if(user && bcrypt.compareSync(password, user.password)){
                    next();
                } else {
                    res.status(400).json({ message: 'please provide valid cridentials'});
                };
            })
            .catch(err => {
                res.status(500).json({err});
            });
    };
};