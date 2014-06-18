Parse.initialize("LXu553qsB1idva0RxKbksnYdbwn54XQE1JxPX4rJ", "6Bh7L4V3kTKPoINzY72A1AYcMWdT1jnJuhHtnPGD");

var strurl = location.search;
var ParaVal;

if (strurl.indexOf("?")!=-1){
    var getSearch = strurl.split("?");  
}

console.log(getSearch[1]);

var takeid = getSearch[1] ; //window.location.hash
var Data = Parse.Object.extend("Data");
var query = new Parse.Query(Data);
var thisNewsMedia = "";

 query.get(takeid, {
  success: function(news) {

    var newstitle = news.get("title");
    var newsurl = news.get("website");
    var newsmedia = news.get("media"); 
    var newslike = news.get("like");
    var newsunlike = news.get("unlike"); 
    var newseditorial = news.get("editorial");
    var newsofficial = news.get("official");
    var newspeople = news.get("people");
    var newsother = news.get("other");
  
    thisNewsMedia = newsmedia; 
    console.log(newsmedia);
     
      
      //recommendation news //havent't replace the link
      
  var DataTwo = Parse.Object.extend("Data");
  var queryquery = new Parse.Query(DataTwo);
    //console.log(thisNewsMedia);
    queryquery.notEqualTo("media",thisNewsMedia);
    queryquery.lessThan("editorial",1);
    queryquery.notEqualTo("id",takeid);
    //queryquery.limit(3);
    queryquery.find({
      success: function(results){
       //alert("you did it");
        var randomNum=[];
           for(var k=0;k<3;k++){
               randomNum[k] = Math.floor((Math.random()*100) % results.length);
               
               for(var l=0;l<k;l++){
                   if(randomNum[l]==randomNum[k]){
                   k--;
                    break;
                   }                    
               }
              
           }
       for (var i = 0; i < 3; i++) { 
          //  console.log(randomNum[0],randomNum[1],randomNum[2]);
          var object = results[randomNum[i]];
          var renewtitle = object.get('title');
          var renewmedia = object.get('media');   
          var renewid = object.id;   
          var CHremedia; 
             switch (renewmedia){
               case "apple":
                 CHremedia = "蘋果日報";
                 break;  
               case "chinatimes":
                 CHremedia = "中國時報";
                 break;   
               case "ettv":
                 CHremedia = "東森新聞";
                 break;
               case "lihpao":
                 CHremedia = "立報";
                 break;   
               case "set":
                 CHremedia = "三立新聞";
                 break;   
               case "Ltn":
                 CHremedia = "自由時報";
                 break;   
               case "udn":
                 CHremedia = "聯合報";
                 break; 
               case "yahoo":
                 CHremedia = "奇摩新聞";
                 break;
               case "cw":
                 CHremedia = "天下雜誌";
                 break;
       }        
           
          var putsrenewtitle = "<td class='news grid_3'id=" +"renew"+i +"> <a href=third.html?"+renewid+">" + renewtitle + " | " +CHremedia+ "</a> </td>";  
             //console.log(renewtitle);
             //console.log(putsrenewtitle);
             $("#test").append (putsrenewtitle);
       };       
    },
    error: function(error){
         
    }
      
  });
    
        var CHmedia; 
       switch (newsmedia){
         case "apple":
            CHmedia = "蘋果日報";
            break;  
         case "chinatimes":
            CHmedia = "中國時報";
            break;   
         case "ettv":
            CHmedia = "東森新聞";
            break;
         case "lihpao":
            CHmedia = "立報";
            break;   
         case "set":
            CHmedia = "三立新聞";
            break;   
         case "Ltn":
            CHmedia = "自由時報";
            break;   
         case "udn":
            CHmedia = "聯合報";
            break; 
         case "yahoo":
            CHmedia = "奇摩新聞";
            break;
        case "cw":
            CHmedia = "天下雜誌";
            break;
       }       
   
       
    //puts the news title in the html
    var putstitle = "<h2 id='news_title1'>" + newstitle + "  |  " + CHmedia + "  </h2>"  
    document.getElementById('news_title').innerHTML = putstitle ;
    
    //puts the url in the html  
    var putsiframe = "<iframe  src=" + newsurl + " width='920' height='500' scrolling='yes' frameborder='0'> </iframe>"
    document.getElementById('putslink').innerHTML = putsiframe;


//    var putsiframe = "<iframe id='iframePost' src=" + " width='920' height='500' scrolling='yes' frameborder='0'> </iframe>"
//    document.getElementById('putslink').innerHTML = putsiframe;
//    document.getElementById('iframePost').postMessage(newsurl,'*');
    
    //for test : alert(takeid+"+"+newstitle);  
      
      
    //change the fair bar    var newslike = news.get("like") var newsunlike = news.get("unlike")
    console.log(newslike);  
    var bartotal = newslike + newsunlike;
    var likebarlong = (newslike / bartotal * 100 );
    var unlikebarlong = 100.00 - likebarlong ;
    document.getElementById("fair").style.width = likebarlong + "%" ;
    document.getElementById("unfair").style.width = unlikebarlong + "%" ;

      
      
    //button events
      //click like
      document.getElementById('like').addEventListener('click', function(){
        news.increment("like");
        news.save();
        alert("[公正] Thank you for voting!") ;
        window.location.reload();  
      });
      
      //click unlike
      document.getElementById('unlike').addEventListener('click', function(){
        news.increment("unlike");
        news.save();
        alert("[偏頗] Thank you for voting!")
        window.location.reload();
      });
      
    //categorize  
      
      //click editorial
      document.getElementById('editorial').addEventListener('click', function(){
        news.increment("editorial");
        news.save();
        alert("[社論看法] Thank you for voting!")
        window.location.reload();
      });
 
      //click official
      document.getElementById('official').addEventListener('click', function(){
        news.increment("official");
        news.save();
        alert("[官方消息] Thank you for voting!")
        window.location.reload();
      });
      
      //click people
      document.getElementById('people').addEventListener('click', function(){
        news.increment("people");
        news.save();
        alert("[人民聲音] Thank you for voting!")
        window.location.reload();
      });
      
      //click other
      document.getElementById('other').addEventListener('click', function(){
        news.increment("other");
        news.save();
        alert("[其他文章] Thank you for voting!")
        window.location.reload();
      });
      
      
     
      
      
  },
  error: function(object, error) {
    // The object was not retrieved successfully.
    // error is a Parse.Error with an error code and description.
  }
 }); //end of query id



var DataThree = Parse.Object.extend("Data");
var queryqueryquery = new Parse.Query(DataThree);
  queryqueryquery.greaterThan("editorial", 0);
  queryqueryquery.notEqualTo("id",takeid);
  queryqueryquery.limit(3);
  queryqueryquery.find({
    success: function(resultedi){
        
        var randomNum=[];
           for(var k=0;k<3;k++){
               randomNum[k] = Math.floor((Math.random()*100) % resultedi.length);
               
               for(var l=0;l<k;l++){
                   if(randomNum[l]==randomNum[k]){
                   k--;
                    break;
                   }                    
               }
            
           }
        
     for (var i = 0; i < 3; i++) { 
       var Objectedi = resultedi[randomNum[i]];
          var reedititle = Objectedi.get('title');
          var reediid = Objectedi.id;    
             var putsreedititle = "<td class='news grid_3'id=" +"reedi"+i +"> <a href=third.html?"+reediid+">" + reedititle + "</a> </td>";
             //console.log(reediid);
             //console.log(putsreedititle);
             $("#test1").append (putsreedititle);
       };       
    },
    error: function(error){

    }
  });

