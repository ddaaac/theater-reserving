var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    phone_number: Number,
    register_date: { type: Date, default: Date.now  }
});
//users collection의 json 파일들은 userSchema를 따르도록 설정
module.exports = mongoose.model('users', userSchema);