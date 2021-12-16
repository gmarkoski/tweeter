/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// const $tweet = $(`<article class="tweet">Hello world</article>`);

// Fake data taken from initial-tweets.json
$(()=> {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]


  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $("#tweet-container").append($tweet);
    }
  };

  function createTweetElement (tweet) {
    const $tweet = $(`
    <article class="tweet">
    <header class="tweet-header">
    <h4>${tweet.user.name}</h4>
    <h4>${tweet.user.handle}</h4>
  </header>      
  <section class="tweet-section">
    <p>${tweet.content.text}</p>              
  </section>
  <footer class="tweet-footer">
    <p>${timeago.format(tweet.created_at)}</p>   
    <p class="icons">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </p> 
  </footer>
  </article>`);

  return $tweet;
  };
  renderTweets(data);

});  
// const $tweet = createTweetElement(tweetData);
//renderTweets(data);
 //console.log($tweet); // to see what it looks like
// $('#tweet-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
