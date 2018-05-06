const postJson = function(url, data, success, error) {
  $.ajax({
    url: url,
    type: 'post',
    data: data,
    headers: {
      'X-Accept': 'application/json'
    },
    dataType: 'json',
    success: success,
    error: error
  })
}

const assert = function(value, errorMessage) {
    console.assert(value, {
      message: errorMessage
    })
}

const postJsonPromise = function(url, data) {
  return new Promise((resolve, reject) => 
    postJson(url, data, resolve, reject)
  )
}

const isUndefined = function(value) {
  return typeof(value) === 'undefined'
}

const clipString = function(str, maxLength, stringEnd = '...') {
  if (str.length > maxLength) {
    return str.substr(0, maxLength - stringEnd.length) + stringEnd
  }
  return str
}
