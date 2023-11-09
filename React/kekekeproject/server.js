const express = require('express') // 미들웨어인 express
const app = express() // express 기능
const cors = require('cors') // react와 node 방화벽 제거
const bodyParser = require('body-parser') // post방식의 데이터 파싱해주는거

const userRouter = require('./routes/user') // 유저 router

app.use(cors()) // react와 node 방화벽 제거

app.use(bodyParser.json()) // form 파싱
app.use(bodyParser.urlencoded({extended : true})) // post 파싱



app.get('/get', (req,res)=>{
    console.log('get test',);
    res.status(200).send({message : 'ex get 요청 받음'})
})


app.post('/post', (req,res)=>{
    console.log('post test');
    res.status(200).send({message : `${req.body}받음`})
})


app.use('/user', userRouter) // 유저라우터


app.set('port', process.env.PORT || 3333)
app.listen(app.get('port'))