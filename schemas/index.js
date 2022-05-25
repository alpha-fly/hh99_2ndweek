const mongoose = require("mongoose");

//로컬용
// const connect = () => {
//     mongoose.connect("mongodb://localhost:27017/articles", {ignoreUndefined: true}).catch((err) => {
//         console.error(err);
//     });
// };

//서버용
const connect = () => {
    mongoose.connect("mongodb://test:test@3.34.42.87:27017/articles", {ignoreUndefined: true}).catch((err) => {
        console.error(err);
    });
};


module.exports = connect; 
