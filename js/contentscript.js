var Downloader = {
  DOWNLOAD_BUTTON_URL: chrome.extension.getURL('images/download-button.svg'),
  DOWNLOADER_CLASS: "has-downloader-button",

  init: function() {
    setInterval(function() {
      Downloader.injectButtons();
    }, 2000);
  },

  buildDowloadButton: function(contentUrl) {
    return $('<div/>', {
      'class': 'ProfileTweet-action ProfileTweet-action--download-media',
    }).append(
      $('<a download/>').attr({
        href: contentUrl,
        download: contentUrl.split('/').pop(),
      }).append(
        $('<div/>', {
          'class': 'IconContainer js-tooltip',
        }).append(
          $('<img/>').attr({
            src: Downloader.DOWNLOAD_BUTTON_URL,
            display: "inline-block",
            height: '16px',
            width: '16px',
          })
        )
      )
    );
  },

  getSingleImageLink: function(singlePhoto) {
    return singlePhoto.find('img').prop('src');
  },

  getSingleVideoLink: function(singleVideo) {
    return singleVideo.find('source').prop('src');
  },

  markTweetAsProcessed: function(parentTweet) {
    parentTweet.addClass(Downloader.DOWNLOADER_CLASS);
  },

  addDownloadButton: function(idx, parentTweet) {
    parentTweet = $(parentTweet);
    var singlePhoto = parentTweet.find('.AdaptiveMedia-singlePhoto');
    var children = parentTweet.find(
      '.ProfileTweet-actionList'
    );
    var processed = false;
    if (singlePhoto.length === 1) {
      children.append(Downloader.buildDowloadButton(Downloader.getSingleImageLink(singlePhoto)));
      processed = true;
    }
    var singleVideo = parentTweet.find('.AdaptiveMedia-video');
    if (singleVideo.length === 1) {
      var link = Downloader.getSingleVideoLink(singleVideo);
      if (link !== undefined) {
        processed = true;
        children.append(Downloader.buildDowloadButton(link));
      }
    }
    if (processed) {
      Downloader.markTweetAsProcessed(parentTweet);
    }
  },

  injectButtons: function() {
    var parentsToUpdate = $('div.tweet, .has-cards').not('.' + Downloader.DOWNLOADER_CLASS);
    parentsToUpdate.each(Downloader.addDownloadButton);
  }
};

Downloader.init()
