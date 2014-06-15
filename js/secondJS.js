(function(){

  (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js"; 
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  window.fbAsyncInit = function () {

  FB.init({
    appId: '240934986105772', 
    xfbml: true,
    version: 'v2.0'
  });

  FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
      alert("connected");
      var uid = response.authResponse.userID;

      }else if (response.status === 'not_authorized') {
          alert("not_authorized");
      //要求使用者登入，索取publish_actions權限
      console.log("this user is not authorizied your apps");
      FB.login(function (response) {
           FB.api('/me/feed', 'post', {message: 'I\'m started using FB API'});
          if (response.authResponse) { // if user login to your apps right after handle an event
              window.location.reload();
          };
      }, {
          scope: 'user_about_me,email,user_location,user_photos,publish_actions,user_birthday,user_likes'
      });      
      } else {
            alert("just log in!");
        //同樣要求使用者登入
        console.log("Please log in to Facebook first.");
        FB.login(function (response) {
            if (response.authResponse) {
                window.location.reload();
            } else {
                alertify.alert('An Error has Occurs,Please Reload your Pages');
            }
        });
      }
   });

  };

//初始化Parse();
  Parse.initialize('5M7ztCYOUkQbUkiFmww8RmM1GTKyTKl2wjMUMQla','MqZ4M3m5hrvO11SqnCT86r8buTqCjlTQhjPV10ZB');


    var handler = {

     /* header按鈕變更      if 已登入 > 登入鍵消失    else if 點擊登入按鈕跳出FB登入跳窗 */
      navbarFunc:function(){

      },

     /* 分頁功能 ＋ 顯示新聞圖片 標題 內文 */
      classficationFunc:function(clickID){
        var News = Parse.Object.extend("Data");
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
            var newsIDinParse = objectNews.get("objectID");
            var newsTitle = objectNews.get("title");
            var newsPicture = objectNews.get("picture");
            var newsText = objectNews.get("text");
//            var newsUrl = objectNews.get("website"); //在這頁可能暫時用不到(?)

//            alert(newsIDinParse);
            console.log(newsIDinParse);

            var str="<img src="+ newsPicture +">";
            var putANews= "<tr class='hot'><td class='grid_4 alpha' id='picF'><img crossorigin='Anonymous' src=" 
                          + newsPicture 
                          + "></td><td class='ab grid_8 omega'><h2><a href=" 
                          + "#"
                          + newsIDinParse
                          + ">"
                          +  newsTitle
                          +"</a></h2><p>"
                          +  newsText
                          +"</p></td></tr>";  
            $("#putNewsHere").append(putANews);
          }},
          error:function(object,error){
          }
        });
      }
   	};

    //get into classfication page >> list all the news in database
    $('#worthyReading').on('click',function(){handler.classficationFunc('worthyReading');}); 

    //click different buttons >> clear the "tbody" >> do the query and print out
    $('#editorial').on('click',function(){handler.classficationFunc('editorial');});
    $('#officialSound').on('click',function(){handler.classficationFunc('officialSound');});
    $('#peopleSound').on('click',function(){handler.classficationFunc('peopleSound');});
    $('#otherSound').on('click',function(){handler.classficationFunc('otherSound');});

    //click personal page >> check the login Status
    //--if logged >> in then turn the page into personal page
    //--if not >> logging window popout >> then turn the page into personal page
    $('#personalPage').on('click',function(){handler.classficationFunc('otherSound');});


})();
