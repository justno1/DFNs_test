(function(){

//初始化Parse();
  Parse.initialize('5M7ztCYOUkQbUkiFmww8RmM1GTKyTKl2wjMUMQla','MqZ4M3m5hrvO11SqnCT86r8buTqCjlTQhjPV10ZB');

    var handler = {

     /* header按鈕變更      if 已登入 > 登入鍵消失    else if 點擊登入按鈕跳出FB登入跳窗 */
      navbarFunc:function(){

      },


     /* 分頁功能 ＋ 顯示新聞圖片 標題 內文 */
      classficationFunc:function(){
//        alert("In classficationFunc");
        var News = Parse.Object.extend("data");
        var query = new Parse.Query(News);
        query.get("5rIhoPJKu3"  ,{
          success:function(news){

            var newsTitle = news.get("title");
            var newsPicture = news.get("picture");
            var newsText = news.get("text");
            var newsUrl = news.get("website");

            alert(newsPicture);
            console.log(newsPicture);



            document.getElementById('putNewsHere').value = newsTitle;
            var str="<img src="+ newsPicture +">";
            var putANews= "<tr class='hot'><td class='grid_4 alpha' id='picF'><img src=" 
                          + newsPicture 
                          + "></td><td class='ab grid_8 omega'><h2><a href=" 
                          +  newsUrl 
                          + ">"
                          +  newsTitle
                          +"</a></h2><p>"
                          +  newsText
                          +"</p></td></tr>";  
            $("#putNewsHere").append(putANews);

          },
          error:function(object,error){

          }
        });
      }
   	};

    handler.classficationFunc();



 /* router設定*/
/*
  var router = Parse.Router.extend({

    routes:{
//      'index/': 'index',
      'second.html': 'classfication',
//      'third/:news_id': 'news',
//      'personalpage/': 'personalpage',
      
    },

 //   index: handler. ,
    classfication: handler.classficationFunc ,
 //   news: handler.classficationFunc ,
 //   personalpage: handler. ,

   });
*/
//  this.Router = new router();
//  Parse.history.start();


})();
