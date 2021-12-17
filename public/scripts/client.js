/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$("document").ready(function() {

  const loadTweets = function() {
    $.ajax("/tweets", {
      method: 'GET',
    })
      .then(
        (tweets) => {
          renderTweets(tweets);
        }
      );
  };
    
  $('#newTweetForm').submit(function(event) {
    event.preventDefault();
    console.log($(this).serialize());
   
    $.ajax("/tweets", {
      method : 'POST',
      data : $(this).serialize()
      
    })
      .then(function() {
        console.log("tweet loaded");
        loadTweets();
      });
     $("form").trigger("reset");
    //  $("#tweet-text").empty();
  });

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
  // renderTweets(data);
 loadTweets();
});