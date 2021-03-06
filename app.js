const express = require ("express"); 
const connect = require("./schemas");
const app = express();
const port = 3000;

connect();

const articleRouter = require("./routes/article");

const requestMiddleware = (req, res, next) => {                    // ** app.use (미들웨어)의 순서 중요!!
    console.log('Request URL:', req.originalUrl, ' - ', new Date());
    next();
}

app.use(express.static("static"))
app.use(express.json()); //JSON 데이터 parsing middleware
app.use(express.urlencoded());
app.use(requestMiddleware); // 콘솔에 request 들어오면 url이랑 날짜 찍어주는.

app.use('/api', [articleRouter]); 

app.get('/', (req,res) => {     //여기가 Router. 미들웨어와 유사하게 생김 (일종의 미들웨어다)request와 response
    res.send("hello world")
});

app.listen(port, () => {                        
    console.log(port, "포트로 서버가 켜졌어요!");
});


