$("document").ready(function() {
  const $tBox = $("#tweet-text");
  
  $tBox.on("input", function() {
    const textInput = $(this).val();
    
    if (textInput.length === 0) {
      $(this).parent().find('.counter').text(140);
    }
    $(this).parent().find('.counter').text(140 - textInput.length);
    if (textInput.length > 140) {
      $(this).parent().find('.counter').addClass("negative-num");
    } else {
      $(this).parent().find('.counter').removeClass("negative-num");
    }
  });
});

