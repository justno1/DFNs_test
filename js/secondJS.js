(function(){

//初始化Parse();
  Parse.initialize('5M7ztCYOUkQbUkiFmww8RmM1GTKyTKl2wjMUMQla','MqZ4M3m5hrvO11SqnCT86r8buTqCjlTQhjPV10ZB');

    var handler = {

     /* header按鈕變更      if 已登入 > 登入鍵消失    else if 點擊登入按鈕跳出FB登入跳窗 */
      navbarFunc:function(){

      },

     /* 分頁功能 ＋ 顯示新聞圖片 標題 內文 */
      classficationFunc:function(clickID){
        var News = Parse.Object.extend("data");
        var query = new Parse.Query(News);
        document.getElementById('putNewsHere').innerHTML = "";

        
        var clickWhatID = clickID;
        if(clickWhatID==="worthyReading"){
          query.equalTo();
        }else if(clickWhatID==="editorial"){
          query.greaterThan("editorial", 0);
        }else if(clickWhatID==="officialSound"){
          query.greaterThan("official", 0);
        }else if(clickWhatID==="peopleSound"){
          query.greaterThan("people", 0);
        }else if(clickWhatID==="otherSound"){
          query.greaterThan("other", 0);
        }

        console.log("this is the ID that you click : "+clickWhatID);
        query.find({
          success:function(news){
            for(var i=0;i<news.length;i++)
            {
            
            var objectNews = news[i];
            var newsTitle = objectNews.get("title");
            var newsPicture = objectNews.get("picture");
            var newsText = objectNews.get("text");
            var newsUrl = objectNews.get("website");

 //           alert(newsPicture);
            console.log(newsPicture);

            var str="<img src="+ newsPicture +">";
            var putANews= "<tr class='hot'><td class='grid_4 alpha' id='picF'><img crossorigin='Anonymous' src=" 
                          + newsPicture 
                          + "></td><td class='ab grid_8 omega'><h2><a href=" 
                          +  newsUrl 
                          + ">"
                          +  newsTitle
                          +"</a></h2><p>"
                          +  newsText
                          +"</p></td></tr>";  
            $("#putNewsHere").append(putANews);
          }

          },
          error:function(object,error){

          }
        });
      }
   	};

    $('#worthyReading').on('click',function(){handler.classficationFunc('worthyReading');});
    $('#editorial').on('click',function(){handler.classficationFunc('editorial');});
    $('#officialSound').on('click',function(){handler.classficationFunc('officialSound');});
    $('#peopleSound').on('click',function(){handler.classficationFunc('peopleSound');});
    $('#otherSound').on('click',function(){handler.classficationFunc('otherSound');});


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
