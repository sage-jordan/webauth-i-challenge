const express = express();

module.exports = server => {
    server.use(express.json());
};