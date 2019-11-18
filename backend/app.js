var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
// const cors = require('cors');

//app.use(express);
// mongodb 서버와 연결
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});
// ticketing db와 연결
mongoose.connect('mongodb://127.0.0.1:27017/ticketing');

// User에 userSchema를 통해 설정한 users collection의 user객체를 할당
var User = require('./models/users');

// Theater에 userSchema를 통해 설정한 theaters collection의 theater객체를 할당
var Theater = require('./models/theater');

// reguest의 body값을 json 형식으로 인코딩
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

// router변수에 routes디렉토리 할당
var routerUser = require('./routes/indexUser.js')(app, User);

// router변수에 routes디렉토리 할당
var routerTheater = require('./routes/indexTheater.js')(app, User);


// 3000번 포트로 listen
var server = app.listen(port, function(){
    console.log("Express server has started on port " + port);

});