var Downloader = {
  DOWNLOAD_BUTTON_URL: chrome.extension.getURL('images/download-button.svg'),
  DOWNLOADER_CLASS: "has-downloader-button",

  init: function() {
    setInterval(function() {
      Downloader.injectButtons();
    }, 2000);
  },

  buildDowloadButton: function(content_url) {
    var result = $('<input/>').attr({
      type: "button",
    });
    result.css("background-image", "url('" + Downloader.DOWNLOAD_BUTTON_URL + "')");
    result.css("background", "url('" + Downloader.DOWNLOAD_BUTTON_URL + "')");
    result.css("display", "inline-block");
    result.css("background-size", "100%");
    result.css("height", '16px');
    result.css("width", '16px');
    return result;
  },

  injectButtons: function() {
    var parentsToUpdate = $('div.tweet, .has-cards').not('.' + Downloader.DOWNLOADER_CLASS);
    parentsToUpdate.addClass(Downloader.DOWNLOADER_CLASS);
    var children = parentsToUpdate.find(
      '.ProfileTweet-actionList'
    );
    children.append(Downloader.buildDowloadButton(''));
  }
};

Downloader.init()
