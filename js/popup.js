'use strict'

console.log('Popup start')

const SECOND_MS = 1000
const THREE_SECONDS_MS = 3 * SECOND_MS

function popupUpdater(message) {
  console.log('Received message: ' + JSON.stringify(message))
  let statusText = message.statusText
  let isLoading  = message.isLoading
  $('#status-text').text(statusText)
  let loadingDisplay = isLoading
                        ? 'initial'
                        : 'none'
  $('#loading-pic').css('display', loadingDisplay)
}

$(document).ready(function() {
  dataRetrieval.getCurrentTabUrl().then(url => {
    console.log('Sending message with url: ' + url)
    return messaging.communicateWithEventPage({
      url: url
    })
  }).then(popupUpdater).then(() =>
    setTimeout(() => window.close(), THREE_SECONDS_MS)
  )
})
