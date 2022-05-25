const mongoose = require("mongoose");

const connect = () => {
    mongoose.connect("mongodb://localhost:27017/articles", {ignoreUndefined: true}).catch((err) => {
        console.error(err);
    });
};

module.exports = connect; 
