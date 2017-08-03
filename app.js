$(document).ready(function ( ){
    var siteURL;
    var settingsURL;
    var postsURL;
    var pagesURL;
    var catURL;
    var tagURL;
    var mediaURL;
    
    //Declare variables to store counts
//posts
var cPosts = 0;
var createPost;
var updatePost;
var createDates = [];
var c; //used in CalcPostsFinal
var f; //used in CalcPostsFinal
var pageNo = 1; //used to cycle through pages, should start at 1 for each cycle
    
    
    $('button#submit-url').click(function(){
        var values = $('#url-text').val();
        SetURL(values);
        PostsAjax(postsURL, pageNo);        
        });
    
    //Page elements
    
//Site title
var siteTitle;



//post and page contents
var cIframes = 0;
var cStream = 0;
var cDocs = 0;

//pages
var cPages = 0;
var createPage;
var updatePage;

//categories
var cCat = 0;
var categories = [];

//tags
var cTag = 0;
var tags = [];

//media
var cMedia = 0;
var cImageMedia = 0;
var cAudioMedia = 0;
var cVideoMedia = 0;
var cAppMedia = 0;

function SetURL(inputString){
    siteURL = inputString;
    settingsURL = siteURL + "/wp-json/wp/v2/settings";
    postsURL = siteURL + "/wp-json/wp/v2/posts?per_page=100";
    pagesURL = siteURL + "/wp-json/wp/v2/pages?per_page=100";
    catURL = siteURL + "/wp-json/wp/v2/categories?per_page=100";
    tagURL = siteURL + "/wp-json/wp/v2/tags?per_page=100"
    mediaURL = siteURL + "/wp-json/wp/v2/media?per_page=100";
}

//GET site title
//to do.  for now:
siteTitle = siteURL;

//GET posts
//final date is still incorrect - fixed!

    //var url = "https://wp.nyu.edu/pfa_sandbox/wp-json/wp/v2/posts?per_page=50";




function PostsAjax(address, page){
        $.ajax({
  method: "GET",
  url: address + "&page=" + page,
    success: function (data){
        cPosts = cPosts + data.length;
        for(var i = 0; i < data.length; i++){
            cIframes = cIframes + occurrences(data[i].content.rendered, "<iframe", true);
            cStream = cStream + occurrences(data[i].content.rendered, "https://cdnapisec.kaltura.com");
            cDocs = cDocs + occurrences(data[i].content.rendered, "https://docs.google.com")
            if(isNaN(Date.parse(data[i].date))){
                continue;
            }
            else{
            createDates.push(Date.parse(data[i].date));
            }
        }
    }
              })
            .done(function(data){
                 if(cPosts % 50 == 0){
                    pageNo = pageNo + 1;
                    PostsAjax(url, pageNo);
    }
            else{
                CalcPostsFinal();
            }
            });
}

function occurrences(string, subString, allowOverlapping) {

    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}

function CalcPostsFinal(){
    
    //most recent post
    c = Math.max.apply(null, createDates);
    c = new Date(c).toDateString();
    console.log("Final = " + c);
    
    //first post
    f = Math.min.apply(null, createDates);
    f = new Date(f).toDateString();
    console.log("First post = " + f);
    
    //post count
    console.log("Final cPosts = " + cPosts);
    
    //iframes
    console.log("iframes = " + cIframes);
    
    //nyu stream
    console.log("nyu stream = " + cStream);
    
    //google
    console.log("google = " + cDocs);
}

    
    
//GET pages

//GET categories

//GET Media

//GET users

//output
//console.log(siteTitle);
  
    
    
})