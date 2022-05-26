// 게시글 조회
function getArticles(category, callback) {
  $("#articleList").empty();
  $.ajax({
    type: "GET",
    url: `/api/article`,

    success: function (response) {
      callback(response["articles"]);
    },
  });
}


// 게시글 상세 조회
function getArticleDetail(articleId, callback) {
  $.ajax({
    type: "GET",
    url: `/api/article/${articleId}`,

    success: function (response) {
      callback(response.article);
    },
  });
}


// 게시글 삭제 ********* 진짜 이거에 몇시간 썼냐... 에러시 에러메시지 필요
function deleteArticle(articleId) {
  let password = $("#password").val();  

  $.ajax({
    type: "POST",
    url: `/api/article/${articleId}`,
    data: {
      password,
    },
    error: function (xhr, status, error) {
      if (xhr.status == 400) {
        alert("패스워드가 맞지 않습니다.");
      }
      window.location.reload();
    },       
    success: function (response) {                  
        alert(response['message'])
        window.location.href ='/'      
    },    
  });
}


// 게시글 수정
function reviseArticle(articleId) {    
  let title = $('#title').val()
  let content = $('#content').val()
  let password = $('#password').val()

  $.ajax({
    type: "PUT",
    url: `/api/article/${articleId}`,
    data: {      
      title, 
      content, 
      password
    },
    error: function (xhr, status, error) {
      if (xhr.status == 400) {
        alert("패스워드가 맞지 않습니다.");
      }
      window.location.reload();
    },     
    success: function (response) {                  
        alert(response['message'])
        window.location.href ='/'      
    },    
  });
}


// 게시글 작성
function writeArticle() {  
  let articleId
  let date = new Date();
  let user = $('#user').val()
  let title = $('#title').val()
  let content = $('#content').val()
  let password = $('#password').val()

  $.ajax({
    type: "POST",
    url: `/api/article/write`,
    data: {
      articleId,
      date,
      user, 
      title, 
      content, 
      password
    },   
    success: function (response) {                  
        alert(response['message'])
        window.location.href ='/'      
    },    
  });
}


