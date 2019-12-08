const Users = require('../users/users-model'); 
const bcrypt = require('bcryptjs');

module.exports = function restricted (req, res, next){
    const { username, pass } = req.headers;
    console.log("Running Middleware...")
    if(username && pass){
        Users.findBy({ username })
            .first()
            .then(user => {
                // console.log("Pass: ", pass);
                // console.log("User: ", user);
                // console.log("User.pass: ", user.pass);
                if(user && bcrypt.compareSync(pass, user.pass)){
                    console.log(`Next()`);
                    next();
                } else {
                    res.status(400).json({ message: 'please provide valid cridentials'});
                };
            })
            .catch(err => {
                res.status(500).json({ error: err.message });
            });
    } else {
        res.status(404).json({ message: `You shall not pass!` });
    };
};