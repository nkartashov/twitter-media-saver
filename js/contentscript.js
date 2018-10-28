var Downloader = {
  DOWNLOAD_BUTTON_URL: chrome.extension.getURL('images/download-button.svg'),
  DOWNLOADER_CLASS: "has-downloader-button",

  init: function() {
    setInterval(function() {
      Downloader.injectButtons();
    }, 2000);
  },

  getSingleImageLink: function(singlePhoto) {
    return singlePhoto.find('img').prop('src');
  },

  getSingleVideoLink: function(singleVideo) {
    var videoItem = singleVideo.find('source');
    if (videoItem.length === 0) {
      videoItem = singleVideo.find('video');
    }
    return videoItem.prop('src');
  },

  markItemAsProcessed: function(parentItem) {
    parentItem.addClass(Downloader.DOWNLOADER_CLASS);
  },

  trimLarge: function(link) {
    var LARGE_POSTFIX = ':large';
    if (!link.includes(LARGE_POSTFIX)) {
      return link;
    }
    return link.substring(0, link.indexOf(':large'));
  },

  addDownloadButton: function(idx, parentTweet) {
    parentTweet = $(parentTweet);
    var callback = function() {
      var singlePhoto = parentTweet.find('.AdaptiveMedia-singlePhoto');
      var singleVideo = parentTweet.find('.AdaptiveMedia-video');
      if (singlePhoto.length === 1) {
        link = Downloader.getSingleImageLink(singlePhoto);
        console.log('Found a single photo at link ' + link);
      } else if (singleVideo.length === 1) {
        link = Downloader.getSingleVideoLink(singleVideo);
        console.log('Found a single video at link ' + link);
      } else {
        link = $('.Gallery-media').find('img').prop('src');
        console.log('Found a zoomed in photo at link ' + link);
      }
      if (link !== undefined) {
        link = Downloader.trimLarge(link);
        console.log('Opening a new tab with link ' + link);
        window.open(link);
      }
    };
    var actionBar = parentTweet.find(
      '.ProfileTweet-actionList'
    );
    actionBar.append(Downloader.buildDynamicDowloadButton(callback));
    Downloader.markItemAsProcessed(parentTweet);
  },

  getActionBarFromMaximizedTweet: function(parentItem) {
    return parentItem.find('.stream-item-footer').find('.ProfileTweet-actionList');
  },

  buildDynamicDowloadButton: function(callback) {
    var linkObject = $('<a/>').attr({
      href: '',
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

  injectButtons: function() {
    var parentsToUpdate = $('div.tweet, .has-cards').not('.' + Downloader.DOWNLOADER_CLASS);
    parentsToUpdate.each(Downloader.addDownloadButton);
  }
};

Downloader.init();
