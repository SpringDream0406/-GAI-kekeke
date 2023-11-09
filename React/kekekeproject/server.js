const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))


app.get('/', (req,res)=>{
    res.send('test')
})

app.post('/login', (req,res)=>{
    console.log('로그인 시도', req.body);
    let {user_id, user_pw} = req.body
    if (user_id === 'kkk01' && user_pw == '11') {
        console.log('로그인 성공');
        res.status(200).send({message:'로그인 성공'})
    }
    else {
        console.log('로그인 실패');
        res.send('로그인 실패')
    }
})

app.set('port', process.env.PORT || 3333)
app.listen(app.get('port'))