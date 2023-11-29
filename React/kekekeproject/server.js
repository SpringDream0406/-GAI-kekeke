const express = require('express'); // 미들웨어인 express
const app = express(); // express 기능
const cors = require('cors'); // react와 node 방화벽 제거
const bodyParser = require('body-parser'); // post방식의 데이터 파싱해주는거
const custRouter = require('./routes/cust'); // 구매자 router
const sellerRouter = require('./routes/seller')
const productRouter = require('./routes/product')
const storeRouter = require('./routes/store')
const sampleRouter = require('./routes/sample')
const orderRouter = require('./routes/order')
const chatRouter = require('./routes/chating')
const cationRouter = require('./routes/cation')
const chatroomRouter = require('./routes/chat')

app.use(cors()); // react와 node 방화벽 제거
app.use(bodyParser.json()); // form 파싱
app.use(bodyParser.urlencoded({extended : true})); // post 파싱
app.use(express.static('public'));

app.use('chat', chatRouter);
app.use('/cust', custRouter); // 구매자 라우터
app.use('/seller', sellerRouter); // 판매자 라우터
app.use('/product', productRouter); // 상품 라우터
app.use('/store',storeRouter); // 가게정보 라우터
app.use('/sample',sampleRouter);// 샘플케이크
app.use('/order', orderRouter); //주문 라우터
app.use('/cation' , cationRouter);//알림 라우터
app.use('/chatroom', chatroomRouter);


app.set('port', process.env.PORT || 3333);
app.listen(app.get('port'));