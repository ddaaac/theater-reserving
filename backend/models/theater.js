var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var theaterSchema = new Schema({
    name: String,
    // datetime은 dd/MM/yyyy HH:mm:ss 형식.
    // 자료형을 array로 하면 collection에 원하는 만큼만 저장할 수 있지 않을까?
    openDate: [{type: "datetime"}],
    info: {
        explanation: String,
        member: {
            role: String,
            name: String
        }
    },
    // centerPos(중심좌표)는 자료형이 어떻게 될 지 몰라서 일단 null로 해놨읍니다.
    // block[0] 은 A블록으로, 그러므로 A블록의 1번좌석은 block[0].seat[0]이라고 할 수 있겠다.
    block: [{
        col: Number,
        row: Number,
        centerPos: null,
        seat: [{
            reserved: Boolean,
            serialNumber: String
        }]
    }],
    register_date: { type: Date, default: Date.now  }
});
//theater collection의 json 파일들은 theaterSchema를 따르도록 설정
module.exports = mongoose.model('theaters', theaterSchema);