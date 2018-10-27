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

  markItemAsProcessed: function(parentItem) {
    parentItem.addClass(Downloader.DOWNLOADER_CLASS);
  },

  addDownloadButton: function(idx, parentTweet) {
    parentTweet = $(parentTweet);
    var singlePhoto = parentTweet.find('.AdaptiveMedia-singlePhoto');
    var actionBar = parentTweet.find(
      '.ProfileTweet-actionList'
    );
    var processed = false;
    if (singlePhoto.length === 1) {
      actionBar.append(Downloader.buildDowloadButton(Downloader.getSingleImageLink(singlePhoto)));
      processed = true;
    }
    var singleVideo = parentTweet.find('.AdaptiveMedia-video');
    if (singleVideo.length === 1) {
      var link = Downloader.getSingleVideoLink(singleVideo);
      if (link !== undefined) {
        processed = true;
        actionBar.append(Downloader.buildDowloadButton(link));
      }
    }
    if (processed) {
      Downloader.markItemAsProcessed(parentTweet);
    }
  },

  getActionBarFromMaximizedTweet: function(parentItem) {
    return parentItem.find('.stream-item-footer').find('.ProfileTweet-actionList');
  },

  buildDynamicDowloadButton: function(callback) {
    var linkObject = $('<a download/>').attr({
      href: '',
      download: '',
    });
    linkObject.click(callback);
    linkObject.append(
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
    );
    return $('<div/>', {
      'class': 'ProfileTweet-action ProfileTweet-action--download-media',
    }).append(
      linkObject
    );
  },

  addDynamicDownloadButton: function(idx, parentItem) {
    parentItem = $(parentItem);
    var actionList = Downloader.getActionBarFromMaximizedTweet(parentItem);
    var callback = function () {
      var imageLink = parentItem.find('.Gallery-media').find('img').prop('src');
      if (imageLink !== undefined) {
        window.location = imageLink;
      }
    };
    actionList.append(Downloader.buildDynamicDowloadButton(callback));
  },

  injectButtons: function() {
    var parentsToUpdate = $('div.tweet, .has-cards').not('.' + Downloader.DOWNLOADER_CLASS);
    parentsToUpdate.each(Downloader.addDownloadButton);

    var maximizedTweet = $('.Gallery, .with-tweet').not('.' + Downloader.DOWNLOADER_CLASS);
    maximizedTweet.each(Downloader.addDynamicDownloadButton);
  }
};

Downloader.init()
