$(document).ready(() => {
  var image_url = chrome.extension.getURL('images/download-button.svg');
  var r = $('<input/>').attr({
    type: "button",
  });
  r.css("background-image", "url('" + image_url + "')");
  r.css("background", "url('" + image_url + "')");
  r.css("display", "inline-block");
  r.css("background-size", "100%");
  r.css("height", '16px');
  r.css("width", '16px');
  $('div.ProfileTweet-actionList').append(r);
})
