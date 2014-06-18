
//initial parse
(function(){
Parse.initialize('LXu553qsB1idva0RxKbksnYdbwn54XQE1JxPX4rJ','6Bh7L4V3kTKPoINzY72A1AYcMWdT1jnJuhHtnPGD');

//檢查是否有登入，改變右上角的按鈕
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

    //  alert("FB init!!");

      FB.init({
        appId: '240934986105772', 
        xfbml: true,
        version: 'v2.0'
      });

      FB.getLoginStatus(function(response) {
          if (response.status === 'connected') {
              document.getElementById('logInButton').style.display = "none"; 

          }else {
              document.getElementById('logInButton').style.display = "display"; 

          }
       });

    };
 /* Handler Functions */
var handler = {
    
//依點進來ID填充新聞
    var takeid = "aCvLAg7xtE";//window.location.hash;
    var Newsdata = Parse.Object.extend("Data");
    var query = new Parse.Query(Newsdata);
    document.getElementById('news_title').innerHTML = "";
    document.getElementById('putslink').innerHTML = "";
     
    query.find({
      success:function(Newsdata){
         for(var i=0;i<Newsdata.length;i++)
            {
    
            var objectnews = Newsdata[i];
            var newsID = objectnews.id;

            
            console.log("yourtakeid"+ takeid + "yournewsid" + newsID);
            
            if(takeid===newsID){
            var newstitle = objectnews.get("title");
            var newspicture = objectnews.get("picture");
            var newstext = objectnews.get("text");
            var newsurl = objectnews.get("website");
            var newsmedia = objectnews.get("media");
            }
            
    
      //塞進標題
      var putstitle = "<h1 id="news_title">" + newstitle + "|" + newsmedia + "  </h1>"
      $("#news_title").append(putstitle);
      //塞進iframe
      var putsiframe = "<iframe  src=" + newsurl + " width=920 height=500 scrolling="yes" frameborder="0"> </iframe>"
      $("#putslink").append(putsiframe);
            }},
      error:function(object,error){
      }
    });
};
    //公正偏頗bar，綁定fb只能按一次
      //案公正鈕parse的like值+1 
      //變動公正bar的比率
     
      
    var fairamount ;
    var unfairamount ;
    var fairtotal ;
    var likebar;
    $('#like').on('click', function(){

        fairamount = 1;
        unfairamount = 6;
        fairtotal = fairamount+unfairamount;
        fairamount +=1 ;
        likebar =(fairamount / fairtotal *100 * 960 /100)+"px";
       // document.getElementById('fair').style.width = "likebar";
    });

    
      //案偏頗鈕parse的unlike+1
      //變動公正bar的比率
     
    
    //推薦新聞
      //記錄到表單
    
    //文章分類鈕
      //按一下分類項的值就加一
    
    //隨機挑選新聞填充
    
    //隨機挑選論文填充
    
      

 

})();