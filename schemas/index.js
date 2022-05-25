const mongoose = require("mongoose");

const connect = () => {
    mongoose.connect("mongodb://test:test@localhost:27017/admin", {dbName:'articles', ignoreUndefined: true}).catch((err) => {
        console.error(err);
    });
};

module.exports = connect; 
