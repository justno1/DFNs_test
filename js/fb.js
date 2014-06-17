window.fbAsyncInit = function () {//facebook init
    
//輸入基本的Facebook init的狀態，與Facebook 連接，包括APP ID的設定
 FB.init({
        appId      : '509000349228550', // APP ID
        status     : false,
        xfbml      : true,
        cookie     : true,
        version    : 'v2.0' 
});

FB.getLoginStatus(function(response) {
  if (response.status === 'connected') {
    //呼叫api把圖片放到#preview IMG tag 內
    console.log("user is logged in and has authenticated your app");
    //var uid = response.authResponse.userID;
    //var accessToken = response.authResponse.accessToken;
    //window.authToken=response.authResponse.accessToken;    
    //    FB.api('/me/likes', function (response) {
    //        console.log(response),
    //    });
        FB.api('/me', {fields: 'last_name'}, function(response) {
            console.log(response);
        });
        document.getElementById("login").style.display="none";
        document.getElementById("logout").style.display="block";
        
    
  }else if (response.status === 'not_authorized') {
    //要求使用者登入，索取publish_actions權限
        console.log("this user is not authorizied your apps");
        document.getElementById("login").style.display="none";
        document.getElementById("logout").style.display="block";
       
  }else {
    //同樣要求使用者登入
     console.log("this isn't logged in to Facebook.");
        document.getElementById("login").style.display="block";
        document.getElementById("logout").style.display="none";
        
  }
 });
};

$("#login").click(function () {
   FB.login(function(response) {
                // FB.api('/me/feed', 'post', {message: 'I\'m started using FB API'});
                if (response.authResponse) { // if user login to your apps right after handle an event
                   // $('#main').html("please wait a moment.....")
                    window.location.reload();
                };
    }, {scope: "user_likes,user_photos,publish_actions"});
});



$("#mypage").click(function(){
FB.getLoginStatus(function(response) {
  if (response.status === 'connected') {
    console.log("user is logged in and has authenticated your app");
          $("#mypage").attr("href", "personalpage.html");
         window.location.href="personalpage.html";  
  }else{
        console.log("haha");
        FB.login(function(response) {
                if (response.authResponse) { 
                    
                    window.location.reload();
                };
    }, {scope: "user_likes,user_photos,publish_actions"});    
  }
 });
});







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
