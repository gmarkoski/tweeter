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

    const length = $("#tweet-text").val().length;
    const error = $(".error-message");
        
    if (!length) {
      error.text("Your tweet cannot be empty.").slideDown();
    } else if (length > 140) {
      error.text("Your tweet is too long, reduce to a maximum of 140 characters.").slideDown();
        
    } else {
      error.text('');
      
      $.ajax("/tweets", {
        method : 'POST',
        data : $(this).serialize()
      })
        .then(function() {
          console.log("tweet loaded");
          loadTweets();
        });

      $("form").trigger("reset");
        
    }
  });
    
  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $("#tweet-container").prepend($tweet);
    }
  };
  

  const createTweetElement = function(tweet) {
    const $tweet = $(`
    <article class="tweet">
    <header class="tweet-header">
    <div>
      <img src = "${tweet.user.avatars}" class="new-pic" />
        <p id="name2"> ${tweet.user.name}</p>
    </div>  
    <h4>${tweet.user.handle}</h4>
  </header>
  <section class="tweet-section">
    <p>${escape(tweet.content.text)}</p>              
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
  
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  loadTweets();
});