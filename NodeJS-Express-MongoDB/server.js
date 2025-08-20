const express = require('express');
const app = express();
const { MongoClient } = require('mongodb')

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

let db
const url = 'mongodb+srv://admin:qwer1234@cluster0.bdq28wz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
new MongoClient(url).connect().then((client)=>{
  console.log('DB연결성공')
  db = client.db('forum')

  app.listen(8080, ()=>{
    console.log('http://localhost:8080 에서 서버 실행 중');
  })
}).catch((err)=>{
  console.log(err)

})

app.get('/', async(req, res)=>{
  // res.send('하이');
  res.sendFile(__dirname + '/index.html');
})

// app.get('/news', (req, res)=>{
//   res.send('뉴스페이지입니다');
// })

// app.get('/shop', (req, res)=>{
//   res.send('쇼핑페이지입니다');
// })

// app.get('/about', (req, res)=>{
//   res.sendFile(__dirname + '/about.html');
// })

// app.get('/time', (req, res)=>{
//   res.render('time.ejs', {result : new Date()});
// })

app.get('/list', async (req, res)=>{
  let result = await db.collection('post').find().toArray();
  res.render('list.ejs', {postList : result})
})
