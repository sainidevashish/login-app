const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/login').then(res=>{
    console.log('DB Connected!');
}).catch(err =>{
    console.log("someting went wrong",err);
})