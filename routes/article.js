const express = require("express")
const Articles = require("../schemas/articles")
// const Cart = require("../schemas/cart")
const router = express.Router();

router.get('/', (req,res) => {
     res.send("this is root page");
});


/// 전체 게시글 목록 조회 API OK * 작성 날짜 기준 내림차순, 제목/작성자명/작성날짜 표시
router.get("/article", async (req,res) => {             
  
  function compare (key) {
    return (a, b) => (Date.parse(a[key]) < Date.parse(b[key]) ? 1 : (Date.parse(a[key]) > Date.parse(b[key]) ? -1 : 0));
  }

  const articles_unsorted = await Articles.find();
  const articles = articles_unsorted.sort(compare("date"));
  
  res.json({
      articles
  });
});


// 게시글 작성 API 
// * 날짜가 자동으로 들어가야 한다. OK
// * 게시글 번호도 자동으로 들어가게 하는 것 OK
router.post("/article/write", async (req, res) => {    
  const { articleId, date, title, user, password, content } = req.body;
  
   const writtenArticle = await Articles.create(
    {
    articleId, // 자동 생성이므로 입력 X
    title,
    user,
    date, // 자동 생성이므로 입력 X
    password,
    content,
    }
  );     

  res.json({ message: "게시글을 작성했습니다." });
});


/// 게시글 조회 API OK
router.get("/article/:articleId", async (req,res) => {                   
    const { articleId }= req.params;

    const [article] = await Articles.find({ articleId: Number(articleId) });
    res.json({
        article,
    });
}); 


// 게시글 수정 API OK **이것도 POST로 변경 가능하지만, 그러면 url을 바꿔야 함(삭제기능과 url이 겹치게 됨)
router.put("/article/:articleId", async (req, res) => {
  const { articleId } = req.params;
  const { title, user, date, password, content} = req.body;

  const article = await Articles.find({articleId: Number(articleId)});
  const passcheck = await article[0]['password']  

  if (password === passcheck) {
    await Articles.updateOne({ articleId: Number(articleId)}, 
      { $set: { title, user, date, password, content }});
  } else {
    return res.status(400).json({ success : false, errormessage : "패스워드가 맞지 않습니다."});
  }
  
  res.json({success: true, message: "게시글을 수정하였습니다."});
});


// 게시글 삭제 API *** DELETE 메서드에 body 넣을 수 있는가의 문제, 되긴 되던데 일단 POST로 변경
router.post("/article/:articleId", async (req, res) => {
  const { articleId } = req.params;
  const { password } = req.body;

  const article = await Articles.find({articleId: Number(articleId)});
  const passcheck = await article[0]['password']  

  if (password === passcheck) {
    await Articles.deleteOne({articleId: Number(articleId)});           
  } else {
    return res.status(400).json({ success : false, errormessage : "패스워드가 맞지 않습니다."});
  }
  
  res.json({success: true, message: "게시글을 삭제하였습니다."});
});

module.exports = router;

